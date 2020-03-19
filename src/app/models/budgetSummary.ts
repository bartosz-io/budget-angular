import { Id } from './types';
import { Period } from './period';

export class BudgetSummary {
  totalExpenses = 0;
  totalBudget = 0;
  get totalLeft() { return this.totalBudget - this.totalExpenses };

  constructor (public accountId: Id, public period: Period) {}

  static buildFromJson(json: any): BudgetSummary {
    const budgetSummary = new BudgetSummary(json.accountId, json.period);
    return Object.assign(budgetSummary, json);
  }

}
