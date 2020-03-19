import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ExpenseCategoryApi } from '../../shared/api/expenseCategory.api';
import { ExpenseCategory } from '@models/expenseCategory';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService {

  constructor(private expenseCategoryApi: ExpenseCategoryApi) { }

  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return this.expenseCategoryApi.getExpenseCategories();
  }

}
