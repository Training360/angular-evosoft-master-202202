import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList$: Observable<User[]> = this.userService.getAll();

  cols: {key: string, title: string}[] = Object.keys(new User()).map(
    key => ({key, title: key})
  );

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleDelete(user: User): void {
    //
  }

  handleSelect(user: User): void {
    this.router.navigate(['/', 'user', 'edit', user.id]);
  }

}
