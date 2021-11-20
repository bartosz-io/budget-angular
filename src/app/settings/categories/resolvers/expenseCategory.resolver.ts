import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { ExpenseCategory } from "@models/expenseCategory";
import { CategoriesFacade } from "../categories.facade";

@Injectable()
export class ExpenseCategoryResolver implements Resolve<ExpenseCategory[]> {
  constructor(private settingsFacade: CategoriesFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ExpenseCategory[]> {
    return this.settingsFacade.loadExpenseCategories();
  }
}
