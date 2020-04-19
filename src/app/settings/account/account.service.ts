import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserApi } from './api/user.api';
import { User } from '@models/user';

@Injectable()
export class AccountService {

  constructor(private userApi: UserApi) { }

  getUsers(): Observable<User[]> {
    return this.userApi.getUsers();
  }

  createUser(user: User): Observable<void> {
    return this.userApi.createUser(user);
  }

  deleteUser(id: string): Observable<void> {
    return this.userApi.deleteUser(id);
  }

}
