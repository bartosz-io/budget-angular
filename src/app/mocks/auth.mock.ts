import { User } from '@models/user';

export const users: User[] = [
  {
      id: '1',
      accountId: '1',
      login: 'bartosz',
      role: 'OWNER'
  },
  {
      id: '2',
      accountId: '2',
      login: 'john',
      role: 'OWNER'
  }
];

export const tokens = {
  'bartosz' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        + 'eyJpZCI6IjEiLCJhY2NvdW50SWQiOiIxIiwibG9naW4iOiJiYXJ0b3N6Iiwicm9sZSI6Ik9XTkVSIiwiaWF0IjoxNTg0NjE1MzkzLCJleHAiOjE1ODQ2MTU5OTN9.'
        + 'mock-signature',

  'john' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        + 'eyJpZCI6IjIiLCJhY2NvdW50SWQiOiIyIiwibG9naW4iOiJqb2huIiwicm9sZSI6Ik9XTkVSIiwiaWF0IjoxNTg0NjE1OTQyLCJleHAiOjE1ODQ2MTY1NDJ9.'
        + 'mock-signature'
};
