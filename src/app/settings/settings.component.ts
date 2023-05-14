import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntypedFormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { CategoriesComponent } from "./categories/container/categories.component";
import { ExpenseCategory } from "@models/expenseCategory";

@Component({
  selector: "settings",
  template: `
    <nav mat-tab-nav-bar>
      <a
        mat-tab-link
        *ngFor="let item of menuItems"
        [routerLink]="item"
        routerLinkActive
        #link="routerLinkActive"
        [active]="link.isActive"
        >{{ item | titlecase }}</a
      >
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class SettingsComponent implements OnInit {
  @ViewChild(CategoriesComponent)
  categoriesComponent: CategoriesComponent;
  forms: UntypedFormGroup[] = [];
  expenseCategories$: Observable<ExpenseCategory[]>;
  menuItems = ["account", "categories"];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.navigate(["account"], { relativeTo: this.route });
  }
}
