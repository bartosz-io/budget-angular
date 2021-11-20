import { Id } from "./types";
import { Period } from "./period";
import { ExpenseCategory } from "./expenseCategory";

export class BudgetDefinition {
  constructor(
    public id: Id,
    public period: Period,
    public category: ExpenseCategory,
    public maxExpenses: number
  ) {}
}
