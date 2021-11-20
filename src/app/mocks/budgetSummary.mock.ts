import { Period } from "@models/period";
import { BudgetSummary } from "@models/budgetSummary";

export const budgetSummary = new BudgetSummary(
  "mockAccountId",
  new Period(3, 2020)
);
budgetSummary.totalExpenses = 200;
budgetSummary.totalBudget = 800;
