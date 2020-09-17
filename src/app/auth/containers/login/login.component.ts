import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { retryWhen, tap, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SnackBarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { OtpComponent } from '../../components/otp-dialog/otp.component';
import { AuthService } from '../../services/auth.service';
import { OAuthService } from './../../services/oauth.service';
import { LoginRequest } from '@models/loginRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  githubLogin = 'Login with GitHub';
  googleLogin = 'Login with Google';

  constructor(private authService: AuthService,
    private oauthService: OAuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['']
    });

    const msg = this.route.snapshot.queryParams.msg;
    if (msg) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        data: msg
      });
    }
  }

  get f() { return this.loginForm.controls; }

  login() {
    const loginRequest: LoginRequest = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.authService.login(loginRequest).pipe(
      retryWhen(this.invalidOtp(loginRequest))
    ).subscribe((user) => this.router.navigate([this.authService.getInitialPathForRole(user.role)]));
  }

  getIdToken() {
    this.oauthService.requestIdToken();
  }

  private invalidOtp(loginRequest: LoginRequest) {
    return (errors: Observable<HttpErrorResponse>) => errors.pipe(
      filter(err => err.error.msg === 'OTP_REQUIRED'),
      switchMap(() => this.requestOtp()),
      tap(otp => loginRequest.otp = otp)
    );
  }

  private requestOtp() {
    const config = {
      width: '400px',
      disableClose: true
    };
    return this.dialog.open(OtpComponent, config).afterClosed();
  }

}
