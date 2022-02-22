import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuRoute } from './model/menu-route';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { RoleGuard } from './service/role.guard';

const routes: MenuRoute[] = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'home',
  },
  {
    title: 'Home',
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [
      AuthGuard,
      // RoleGuard,
    ],
    data: {
      role: 2
    }
  },
  {
    title: 'Users',
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [
      AuthGuard,
      RoleGuard,
    ],
    data: {
      role: 1
    }
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
