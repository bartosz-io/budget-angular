import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { config } from '../../core/config';
import { ExpenseCategory } from '@models/expenseCategory';

@Injectable()
export class ExpenseCategoryApi {

  private API_URL = `${config.apiUrl}/expense-categories`;

  constructor(private http: HttpClient) {}

  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return this.http.get<ExpenseCategory[]>(this.API_URL);
  }

  createExpenseCategory(category: ExpenseCategory): Observable<any> {
    return this.http.post(this.API_URL, category);
  }

  updateExpenseCategory(category: ExpenseCategory): Observable<any> {
    return this.http.put(`${this.API_URL}/${category.id}`, category);
  }

}
