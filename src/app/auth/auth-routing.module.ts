import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';
import { ConfirmComponent } from './containers/confirm/confirm.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup', component: SignupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirm', component: ConfirmComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
