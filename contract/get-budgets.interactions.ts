import { Matchers } from '@pact-foundation/pact';
import { HTTPMethod } from '@pact-foundation/pact/src/common/request';
const { eachLike } = Matchers;

export const getAvailableBugets = {
  state: 'there are budgets for 3/2020',
  uponReceiving: 'a request for budgets',
  withRequest: {
    path: '/budgets/',
    method: 'GET' as HTTPMethod,
    query: {
      month: '3',
      year: '2020',
    },
  },
  willRespondWith: {
    body: eachLike({
      id: '1',
      accountId: '1',
      period: {
        month: 3,
        year: 2020
      }
    }),
    status: 200,
  },
};

export const getUnavailableBugets = {
  state: 'there are no budgets for 12/1900',
  uponReceiving: 'a request for budgets',
  withRequest: {
    path: '/budgets/',
    method: 'GET' as HTTPMethod,
    query: {
      month: '12',
      year: '1900',
    },
  },
  willRespondWith: {
    body: [],
    status: 200,
  },
};


