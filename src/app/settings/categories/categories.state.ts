import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ExpenseCategory } from "@models/expenseCategory";

@Injectable()
export class CategoriesState {
  private updating$ = new BehaviorSubject<boolean>(false);
  private expenseCategories$ = new BehaviorSubject<ExpenseCategory[]>(null);

  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getExpenseCategories$() {
    return this.expenseCategories$.asObservable();
  }

  setExpenseCategories(categories: ExpenseCategory[]) {
    this.expenseCategories$.next(categories);
  }

  addExpenseCategory(category: ExpenseCategory) {
    const currentValue = this.expenseCategories$.getValue();
    this.expenseCategories$.next([...currentValue, category]);
  }

  updateExpenseCategory(updatedCategory: ExpenseCategory) {
    const categories = this.expenseCategories$.getValue();
    const indexOfUpdated = categories.findIndex(
      (category) => category.id === updatedCategory.id
    );
    categories[indexOfUpdated] = updatedCategory;
    this.expenseCategories$.next([...categories]);
  }

  updateExpenseCategoryId(
    categoryToReplace: ExpenseCategory,
    addedCategoryWithId: ExpenseCategory
  ) {
    const categories = this.expenseCategories$.getValue();
    const updatedCategoryIndex = categories.findIndex(
      (category) => category === categoryToReplace
    );
    categories[updatedCategoryIndex] = addedCategoryWithId;
    this.expenseCategories$.next([...categories]);
  }

  removeExpenseCategory(categoryRemove: ExpenseCategory) {
    const currentValue = this.expenseCategories$.getValue();
    this.expenseCategories$.next(
      currentValue.filter((category) => category !== categoryRemove)
    );
  }
}
