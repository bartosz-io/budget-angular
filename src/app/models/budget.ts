import { Id } from "./types";
import { Period } from "./period";
import { ExpenseCategory } from "./expenseCategory";
import { BudgetDefinition } from "./budgetDefinition";

export class Budget {
  id?: string | number;
  accountId?: string | number;
  period!: Period;
  categoryId?: string;
  category?: ExpenseCategory;
  maxExpenses = 0;
  currentExpenses = 0; // updated during adding/removing expense
  get left(): number {
    return this.maxExpenses - this.currentExpenses;
  }
  get leftPercentage(): string {
    return (100 * this.currentExpenses) / this.maxExpenses + "%";
  }

  static build(input: BudgetInput): Budget {
    const budget = new Budget();
    return Object.assign(budget, input);
  }

  static buildFromJson(json: any): Budget {
    const budget = new Budget();
    return Object.assign(budget, json);
  }

  static buildFromDefinition(
    accountId: Id,
    period: Period,
    definition: BudgetDefinition
  ): Budget {
    const budget = new Budget();
    budget.accountId = accountId;
    budget.period = period;
    budget.maxExpenses = definition.maxExpenses;
    budget.category = definition.category;
    return budget;
  }
}

export interface BudgetInput {
  id?: string | number;
  accountId?: string | number;
  period?: Period;
  categoryId?: string;
  category?: ExpenseCategory;
  currentExpenses?: number;
  maxExpenses?: number;
}
