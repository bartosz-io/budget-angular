import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { config } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  setup(email: string, code: string, password: string): Observable<void> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${config.authUrl}/setup`, { email, code, password });
  }

}
