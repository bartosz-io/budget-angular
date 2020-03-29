import { Observable, of } from 'rxjs';
import { AuthStrategy } from './auth.strategy';
import { Token } from '@models/token';
import { User } from '@models/user';

export class JwtAuthStrategy implements AuthStrategy<Token> {

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  doLoginUser(token: Token): void {
    localStorage.setItem(this.JWT_TOKEN, token.jwt);
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return of(JSON.parse(payload));
    } else {
      return of(undefined);
    }
  }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
