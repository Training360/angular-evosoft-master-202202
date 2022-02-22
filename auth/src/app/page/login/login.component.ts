import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IUser } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  user: IUser = {email: '', password: ''};

  constructor(
    private auth: AuthService<IUser>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.auth.register({
    //   email: 'lister@lister.hu',
    //   password: 'password',
    // }).subscribe({
    //   next: user => console.log(user),
    //   error: err => console.error(err),
    // });
  }

  onSubmit(): void {
    this.auth.login(this.user).subscribe({
      next: user => this.router.navigate(['/']),
      error: err => this.errorMessage = err.error,
    });
  }

}
