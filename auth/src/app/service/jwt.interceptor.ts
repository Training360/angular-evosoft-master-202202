import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService, IUser } from '../shared/service/auth.service';
import { User } from '../user/model/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService<IUser>,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.auth.user$.getValue();

    if (user && user.accessToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`),
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
