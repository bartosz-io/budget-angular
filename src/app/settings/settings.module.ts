import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { AccountModule } from "./account/account.module";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

@NgModule({
  imports: [SharedModule, AccountModule, SettingsRoutingModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
