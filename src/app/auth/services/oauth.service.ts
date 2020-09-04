import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  private readonly STATE = 'id_state';
  private readonly NONCE = 'id_nonce';
  readonly STATE_LENGTH = 32;
  readonly NONCE_LENGTH = 16;

  readonly authorizeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  readonly accessTokenUrl = 'https://oauth2.googleapis.com/token';
  readonly userInfoUrl = 'https://openidconnect.googleapis.com/v1/userinfo';
  readonly clientID = '<place `clientId` here>';
  readonly redirectUri = 'http://localhost:4200/oauth';
  readonly responseType = 'id_token';
  readonly scope = 'openid email profile';

  requestIdToken() {
    const state = this.generateRandomString(this.STATE_LENGTH);
    const nonce = this.generateRandomString(this.NONCE_LENGTH);

    const url = `${this.authorizeUrl}` +
      `?client_id=${this.clientID}` +
      `&redirect_uri=${this.redirectUri}` +
      `&response_type=${this.responseType}` +
      `&scope=${this.scope}` +
      `&state=${state}` +
      `&nonce=${nonce}`;

    this.setCurrentState(state);
    this.setNonce(nonce);
    window.location.href = url;
  }

  decodeIdToken(token: string) {
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return JSON.parse(payload);
    }
  }

  isStateValid(state: string) {
    return !!state && state.length === this.STATE_LENGTH && state === this.getCurrentState();
  }

  isNonceValid(user: any) {
    const nonce = user?.nonce;
    return !!nonce && nonce.length === this.NONCE_LENGTH && nonce === this.getNonce();
  }

  private setCurrentState(state: string) {
    localStorage.setItem(this.STATE, state);
  }

  private getCurrentState() {
    return localStorage.getItem(this.STATE);
  }

  private setNonce(nonce: string) {
    localStorage.setItem(this.NONCE, nonce);
  }

  private getNonce() {
    return localStorage.getItem(this.NONCE);
  }

  private generateRandomString(length: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let state = '';
    for (let i = 0; i < length; i++ ) {
       state += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return state;
  }

}

