import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../auth.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  githubSignup = 'Signup with GitHub';

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['']
    });
  }

  get f() { return this.signupForm.controls; }

  signup() {
    this.authService.signup(
      {
        email: this.f.email.value,
        password: this.f.password.value
      }
    ).subscribe(() => this.router.navigate([this.authService.CONFIRM_PATH]));
  }

}
