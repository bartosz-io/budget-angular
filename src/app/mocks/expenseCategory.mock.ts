import { ExpenseCategory } from '@models/expenseCategory';

export const expenseCategories: ExpenseCategory[] = [
  {
    id: 1,
    accountId: 1,
    name: 'Food',
    counterpartyPatterns: [
      'mcdonalds',
      'kfc',
      'subway'
    ]
  },
  {
    id: 2,
    accountId: 1,
    name: 'Shopping',
    counterpartyPatterns: [
      'wallmart',
      'kaufland',
      'auchan']
  },
  {
    id: 3,
    accountId: 1,
    name: 'Entertainment',
    counterpartyPatterns: [
      'rocky bowling',
      'johnys pub',
      'ricky bar'
    ]
  },
  {
    id: 4,
    accountId: 1,
    name: 'Transport',
    counterpartyPatterns: [
      'gas station',
      'tube machine']
  },
  {
    id: 5,
    accountId: 1,
    name: 'Cloths',
    counterpartyPatterns: [
      'tkmax',
      'primark']
  }
];
