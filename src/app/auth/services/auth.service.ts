import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { config, auth0 } from '../../core/config';
import { CacheService } from '../../core/cache.service';
import { AuthStrategy, AUTH_STRATEGY } from './auth.strategy';
import { LoginRequest } from '@models/loginRequest';
import { User } from '@models/user';
import { Role } from '@models/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly INITIAL_PATH = '/app/dashboard';
  public readonly ADMIN_PATH = '/admin';
  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/confirm';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) { }

  getInitialPathForRole(role: Role): string {
    return role === 'ADMIN' ? this.ADMIN_PATH : this.INITIAL_PATH;
  }

  signup(user: User): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/signup`, user);
  }

  confirm(email: string, code: string): Observable<void> {
    return this.http.get<any>(`${config.authUrl}/confirm?email=${email}&code=${code}`);
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<any>(`${config.authUrl}/login`, loginRequest)
      .pipe(tap(data => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.get<any>(`${config.authUrl}/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User> {
    return this.auth.getCurrentUser();
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

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  logoutAuth0() {
    return this.logout().subscribe(() => {
      window.location.href = `${auth0.url}/logout?client_id=${auth0.clientId}&returnTo=${auth0.returnUrl}`;
    });
  }

  isAuth0User(user: User): boolean {
    return user.id.startsWith('auth0');
  }

  private doLogoutUser() {
    this.cacheService.pruneAll();
    this.auth.doLogoutUser();
  }

}
