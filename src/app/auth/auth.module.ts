import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthRoutingModule } from './auth-routing.module';
import { authStrategyProvider } from './services/auth.strategy';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';
import { ConfirmComponent } from './containers/confirm/confirm.component';
import { ForRolesDirective } from './directives/for-roles.directive';
import { PasswordComponent } from './containers/password/password.component';
import { RecoverComponent } from './containers/recover/recover.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmComponent,
    ForRolesDirective,
    PasswordComponent,
    RecoverComponent
  ],
  exports: [
    ForRolesDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    authStrategyProvider
  ]
})
export class AuthModule { }

