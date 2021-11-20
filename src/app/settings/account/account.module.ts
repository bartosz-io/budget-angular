import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { QrCodeModule } from "ng-qrcode";

import { SharedModule } from "../../shared/shared.module";
import { AccountComponent } from "./container/account.component";
import { UserDialogComponent } from "./components/user-dialog/user-dialog.component";
import { SecretDialogComponent } from "./components/secret-dialog/secret-dialog.component";
import { AccountService } from "./account.service";
import { UserApi } from "./api/user.api";
import { SecretApi } from "./api/secret.api";

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, FormsModule, QrCodeModule],
  declarations: [AccountComponent, UserDialogComponent, SecretDialogComponent],
  providers: [AccountService, UserApi, SecretApi],
})
export class AccountModule {}
