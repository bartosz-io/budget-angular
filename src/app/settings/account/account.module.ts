import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './container/account.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog-component';
import { AccountService } from './account.service';
import { UserApi } from './api/user.api';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountComponent,
    UserDialogComponent
  ],
  providers: [AccountService, UserApi]
})
export class AccountModule { }
