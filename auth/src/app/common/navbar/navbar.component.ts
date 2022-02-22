import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MenuRoute } from 'src/app/model/menu-route';
import { AuthService } from 'src/app/shared/service/auth.service';
import { User } from 'src/app/user/model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  routerConfig: MenuRoute[] = this.router.config;

  user$: BehaviorSubject<User | null> = this.auth.user$;

  constructor(
    private router: Router,
    private auth: AuthService<User>,
  ) { }

  ngOnInit(): void {}

}
