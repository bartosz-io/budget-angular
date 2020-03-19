import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { config } from '../../core/config';
import { CacheService } from '../../core/cache.service';
import { Tokens } from '@models/tokens';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly INITIAL_PATH = '/app/dashboard';
  public readonly LOGIN_PATH = '/login';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService) {}

  getUserLogin() {
    const encodedPayload = this.getJwtToken().split('.')[1];
    const payload = window.atob(encodedPayload);
    return JSON.parse(payload).login;
  }

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${config.authUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.login, tokens)),
        mapTo(true),
        catchError(error => {
          // a good place for a logger
          throw error;
        }));
  }

  logout() {
    return this.http.post<any>(`${config.authUrl}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // TODO reimplement refresh process with HttpOnly and SameSite cookies
  // on auth.* subdomain (like auth.application.com)
  refreshToken() {
    return this.http.post<any>(`${config.authUrl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeTokens(tokens);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  logoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  isRefreshUrl(url: string) {
    return `${config.authUrl}/refresh` === url;
  }

  private doLoginUser(login: string, tokens: Tokens) {
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.cacheService.pruneAll();
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}
