import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { config } from '../../core/config';
import { CacheService } from '../../core/cache.service';
import { AuthStrategy, AUTH_STRATEGY } from './auth.strategy';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly INITIAL_PATH = '/app/dashboard';
  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/confirm';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) { }

  signup(user: User): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/signup`, user);
  }

  confirm(email: string, code: string): Observable<void> {
    return this.http.get<any>(`${config.authUrl}/confirm?email=${email}&code=${code}`);
  }

  login(user: User): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/login`, user)
      .pipe(tap(data => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.get<any>(`${config.authUrl}/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map(user => !!user)
    );
  }

  getUserRole$(): Observable<string> {
    return this.auth.getCurrentUser().pipe(
      map(user => user.role)
    );
  }

  getUserEmail$(): Observable<string> {
    return this.auth.getCurrentUser().pipe(
      map(user => user.email)
    );
  }

  logoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  private doLogoutUser() {
    this.cacheService.pruneAll();
    this.auth.doLogoutUser();
  }

}
