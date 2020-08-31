import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  githubLogin = 'Login with GitHub';

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
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
    this.authService.login(
      {
        email: this.f.email.value,
        password: this.f.password.value
      }
    ).subscribe((user) => this.router.navigate([this.authService.getInitialPathForRole(user.role)]));
  }

}
