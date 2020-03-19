import { Id } from './types';

export class ExpenseCategory {
  constructor(
    public id?: Id,
    public accountId?: Id,
    public name = '',
    public counterpartyPatterns: string[] = []) { }
}
