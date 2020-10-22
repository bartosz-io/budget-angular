import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BudgetSummary } from '@models/budgetSummary';
import { Budget } from '@models/budget';
import { Period } from '@models/period';
import { config } from '../../core/config';

@Injectable()
export class BudgetApi {

  constructor(private http: HttpClient) {}

  getBudgets(period: Period): Observable<Budget[]> {
    return this.http.get(`${config.apiUrl}/budgets/?month=${period.month}&year=${period.year}`)
      .pipe(map((budgets: any[]) => budgets.map(budget => Budget.buildFromJson(budget))));
  }

  getBudgetSummary(period: Period): Observable<BudgetSummary> {
    return this.http.get<BudgetSummary>(`${config.apiUrl}/budget-summary/?month=${period.month}&year=${period.year}`)
      .pipe(map(summary => BudgetSummary.buildFromJson(summary)));
  }

}
