import { Period } from "@models/period";
import { Budget } from "@models/budget";
import { expenseCategories } from "./expenseCategory.mock";

const period = new Period(3, 2020);

export const budgets: Budget[] = [
  Budget.build({
    id: 1,
    accountId: 1,
    period: period,
    category: expenseCategories[0],
    currentExpenses: 100,
    maxExpenses: 500,
  }),
  Budget.build({
    id: 2,
    accountId: 1,
    period: period,
    category: expenseCategories[1],
    currentExpenses: 100,
    maxExpenses: 300,
  }),
  Budget.build({
    id: 3,
    accountId: 2,
    period: period,
    category: expenseCategories[2],
    currentExpenses: 200,
    maxExpenses: 300,
  }),
];
