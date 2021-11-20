import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsComponent } from "./settings.component";
import { AccountComponent } from "./account/container/account.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      { path: "account", component: AccountComponent },
      {
        path: "categories",
        loadChildren: () =>
          import("./categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
