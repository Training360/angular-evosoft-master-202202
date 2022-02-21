import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser {
  email: string;
  password: string;
  accessToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService<T extends IUser> {

  private apiUrl: string = environment.apiUrl;

  public endpoint: string = 'users';

  private http!: HttpClient;

  private user$: BehaviorSubject<T | null> =
    new BehaviorSubject<T | null>(null);

  get user(): T | null {
    return this.user$.value;
  }

  constructor() {
    this.http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));
  }

  login(user: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}login`,
      {email: user.email, password: user.password},
    ).pipe(
      switchMap( (response) => {
        if (!response.accessToken) {
          this.user$.next(null);
        }
        return of({...user, accessToken: response.accessToken});
      }),
    )
  }

  register(user: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/register`,
      {email: user.email, password: user.password},
    );
  }

}
