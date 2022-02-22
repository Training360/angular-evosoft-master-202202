import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/service/base.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    http: HttpClient,
  ) {
    super(http);
    this.entityName = 'users';
  }
}
