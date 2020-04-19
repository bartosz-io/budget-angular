import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExpenseCategoryApi } from '../../shared/api/expenseCategory.api';
import { CategoriesState } from './categories.state';
import { ExpenseCategory } from '@models/expenseCategory';

@Injectable()
export class CategoriesFacade {

  constructor(private expenseCategoryApi: ExpenseCategoryApi, private categoriesState: CategoriesState) { }

  isUpdating$(): Observable<boolean> {
    return this.categoriesState.isUpdating$();
  }

  getExpenseCategories$(): Observable<ExpenseCategory[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.categoriesState.getExpenseCategories$();
  }

  loadExpenseCategories() {
    return this.expenseCategoryApi.getExpenseCategories()
      .pipe(tap(categories => this.categoriesState.setExpenseCategories(categories)));
  }

  // optimistic update
  // 1. update UI Model
  // 2. call API
  addExpenseCategory(category: ExpenseCategory) {
    this.categoriesState.addExpenseCategory(category);
    this.expenseCategoryApi.createExpenseCategory(category)
      .subscribe(
        (addedCategoryWithId: ExpenseCategory) => this.categoriesState.updateExpenseCategoryId(category, addedCategoryWithId),
        (error: any) => {
          this.categoriesState.removeExpenseCategory(category);
          console.log(error);
        }
      );
  }

  // pessimistic update
  // 1. call API
  // 2. update UI model
  updateExpenseCategory(category: ExpenseCategory) {
    this.categoriesState.setUpdating(true);
    this.expenseCategoryApi.updateExpenseCategory(category)
      .subscribe(
        () => this.categoriesState.updateExpenseCategory(category),
        (error) => console.log(error),
        () => this.categoriesState.setUpdating(false)
      );
  }

}
