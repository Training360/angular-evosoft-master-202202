import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser {
  email: string;
  role?: number;
  password?: string;
  accessToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService<T extends IUser> {

  private apiUrl: string = environment.apiUrl;

  public endpoint: string = 'users';

  private http!: HttpClient;

  private userKey: string = 'auth0-user';

  private strictSession: boolean = false;

  private userSubject$: BehaviorSubject<T | null> =
    new BehaviorSubject<T | null>(null);

  get user$(): BehaviorSubject<T | null> {
    return this.userSubject$;
  }

  constructor() {
    this.http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));

    if (sessionStorage[this.userKey]) {
      const user: T = JSON.parse(sessionStorage[this.userKey]);
      this.userSubject$.next(user);
    }

    if (this.strictSession) {
      window.addEventListener('beforeunload', (e) => {
        sessionStorage.removeItem(this.userKey);
      });
    }
  }

  login(user: T): Observable<T | null> {
    return this.http.post<T>(
      `${this.apiUrl}login`,
      { email: user.email, password: user.password },
    ).pipe(
      switchMap((response) => {
        if (!response.accessToken) {
          sessionStorage.removeItem(this.userKey);
          return of(null);
        }

        return this.http.get<T[]>(`${this.apiUrl}users?email=${user.email}`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${response.accessToken}`
          }),
        }).pipe( map( users => ({...users[0], accessToken: response.accessToken})));
      }),
      switchMap((user) => {
        if (!user) {
          return of(null);
        }

        const currentUser = { ...user, password: '' };
        sessionStorage.setItem(this.userKey, JSON.stringify(currentUser));
        return of(currentUser);
      }),
    );
  }

  register(user: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/register`,
      { email: user.email, password: user.password },
    );
  }

}
