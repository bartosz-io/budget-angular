import { expenseCategories } from "./expenseCategory.mock";
import { BudgetDefinition } from "@models/budgetDefinition";
import { Period } from "@models/period";

const period = new Period(9, 2017);

export const budgetDefinition: BudgetDefinition[] = [
  {
    id: 1,
    period: period,
    category: expenseCategories[0],
    maxExpenses: 2000,
  },
  {
    id: 2,
    period: period,
    category: expenseCategories[1],
    maxExpenses: 500,
  },
  {
    id: 3,
    period: period,
    category: expenseCategories[2],
    maxExpenses: 1000,
  },
  {
    id: 4,
    period: period,
    category: expenseCategories[3],
    maxExpenses: 1200,
  },
  {
    id: 5,
    period: period,
    category: expenseCategories[4],
    maxExpenses: 2000,
  },
];
