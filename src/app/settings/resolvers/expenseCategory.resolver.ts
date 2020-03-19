import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ExpenseCategory } from '@models/expenseCategory';
import { SettingsFacade } from '../settings.facade';

@Injectable()
export class ExpenseCategoryResolver implements Resolve<ExpenseCategory[]> {

  constructor(private settingsFacade: SettingsFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExpenseCategory[]> {
    return this.settingsFacade.loadExpenseCategories();
  }

}
