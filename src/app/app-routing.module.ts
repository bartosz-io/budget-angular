import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./core/layout/layout.component";
import { DashboardComponent } from "./dashboard/containers/dashboard/dashboard.component";
import { AppGuard } from "./auth/guards/app.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "app",
    canActivate: [AppGuard],
    component: LayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      {
        path: "expenses",
        loadChildren: () =>
          import("./expenses/expenses.module").then((m) => m.ExpensesModule),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/settings.module").then((m) => m.SettingsModule),
      },
    ],
  },
  {
    path: "admin",
    canActivate: [], // how would you implement it? 🧐
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
