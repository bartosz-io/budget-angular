import { Account } from './account';

export class User {
  id?: string;
  accountId?: string;
  account?: Account;
  login?: string;
  password?: string;
  role?: 'OWNER' | 'READER';
}
