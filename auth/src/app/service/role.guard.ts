import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IUser } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService<IUser>,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user: IUser | null = this.auth.user$.getValue();

      if (user && user.role && route.data['role'] && user.role <= route.data['role']) {
        return true;
      }

      this.router.navigate(['/', 'home']);
      return false;
  }

}
