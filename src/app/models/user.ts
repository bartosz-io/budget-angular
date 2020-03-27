import { Account } from './account';

export class User {
  id?: string;
  accountId?: string;
  account?: Account;
  email?: string;
  password?: string;
  role?: 'OWNER' | 'READER';
  confirmed?: boolean;
}
