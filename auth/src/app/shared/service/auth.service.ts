import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser {
  email: string;
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
        let currentUser = null;

        if (!response.accessToken) {
          sessionStorage.removeItem(this.userKey);
        } else {
          currentUser = { ...user, password: '', accessToken: response.accessToken };
          sessionStorage.setItem(this.userKey, JSON.stringify(currentUser));
        }

        this.userSubject$.next(currentUser);
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
