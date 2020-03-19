import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExpenseCategory } from '@models/expenseCategory';
import { ExpenseCategoryApi } from '../shared/api/expenseCategory.api';
import { SettingsState } from './settings.state';

@Injectable()
export class SettingsFacade {

  constructor(private expenseCategoryApi: ExpenseCategoryApi, private settingsState: SettingsState) { }

  isUpdating$(): Observable<boolean> {
    return this.settingsState.isUpdating$();
  }

  getExpenseCategories$(): Observable<ExpenseCategory[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.settingsState.getExpenseCategories$();
  }

  loadExpenseCategories() {
    return this.expenseCategoryApi.getExpenseCategories()
      .pipe(tap(categories => this.settingsState.setExpenseCategories(categories)));
  }

  // optimistic update
  // 1. update UI Model
  // 2. call API
  addExpenseCategory(category: ExpenseCategory) {
    this.settingsState.addExpenseCategory(category);
    this.expenseCategoryApi.createExpenseCategory(category)
      .subscribe(
        (addedCategoryWithId: ExpenseCategory) => this.settingsState.updateExpenseCategoryId(category, addedCategoryWithId),
        (error: any) => {
          this.settingsState.removeExpenseCategory(category);
          console.log(error);
        }
      );
  }

  // pessimistic update
  // 1. call API
  // 2. update UI model
  updateExpenseCategory(category: ExpenseCategory) {
    this.settingsState.setUpdating(true);
    this.expenseCategoryApi.updateExpenseCategory(category)
      .subscribe(
        () => this.settingsState.updateExpenseCategory(category),
        (error) => console.log(error),
        () => this.settingsState.setUpdating(false)
      );
  }

}
