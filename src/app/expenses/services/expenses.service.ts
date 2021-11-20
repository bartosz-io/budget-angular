import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PeriodService } from "../../shared/services/period.service";
import { ExpenseApi } from "../api/expense.api";
import { Period } from "@models/period";
import { Expense } from "@models/expense";

@Injectable()
export class ExpensesService {
  private period = this.periodService.getCurrentPeriod();

  constructor(
    private expenseApi: ExpenseApi,
    private periodService: PeriodService
  ) {}

  getExpenses(period: Period): Observable<Expense[]> {
    return this.expenseApi.getExpenses(period);
  }

  filterExpenses(period: Period, search: string): Observable<Expense[]> {
    return this.expenseApi.filterExpenses(period, search);
  }

  createOrUpdateExpense(expense: Expense): Observable<void> {
    expense.period = this.period;

    if (!expense.id) {
      return this.expenseApi.createExpense(expense);
    } else {
      return this.expenseApi.updateExpense(expense);
    }
  }

  deleteExpense(id: string): Observable<void> {
    return this.expenseApi.deleteExpense(id);
  }
}
