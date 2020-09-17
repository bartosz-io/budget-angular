import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { config } from '../../../core/config';
import { User } from '@models/user';

@Injectable()
export class UserApi {

  private readonly API_URL = `${config.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  createUser(user: User): Observable<void> {
    return this.http.post<void>(this.API_URL, user);
  }

  patchUser(id: string, data: any): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}`, data);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}
