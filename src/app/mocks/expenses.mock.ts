import { expenseCategories } from './expenseCategory.mock';
import { Expense } from '@models/expense';

function getRandomDate(): Date {
  const date = new Date();
  date.setMonth(2);
  date.setDate(Math.random() * 30 + 1);
  return date;
}

function getRandomCategory() {
  const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
  const coutnerparty = category.counterpartyPatterns[0];
  return {
    category,
    categoryId: category.id,
    categoryName: category.name,
    counterparty: coutnerparty.charAt(0).toUpperCase() + coutnerparty.slice(1)
  };
}

function getRandomValue() {
  return Math.floor(Math.random() * 30000) / 100;
}

function generateExpenses(): Expense[] {
  const randomExpenses = [];
  for (let i = 0; i < 10; i++) {
    randomExpenses.push(
      {
        id: i,
        value: getRandomValue(),
        datetime: getRandomDate(),
        ...getRandomCategory()
      }
    );
  }
  return randomExpenses.sort((a, b) => a.datetime - b.datetime);
}

export const expenses = generateExpenses();
