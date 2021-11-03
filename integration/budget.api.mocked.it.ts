import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { Period } from './../src/app/models/period';
import { BudgetApi } from './../src/app/dashboard/api/budget.api';
import { ConfigProvider } from './../src/app/core/config.provider';

const createGetBudgetsStub = () => {
  return rest.get('/api/budgets', (req, res, ctx) => {

    const query = req.url.searchParams;
    const month = parseInt(query.get('month'));
    const year = parseInt(query.get('year'));

    if (month > 0 && month <= 12 && year > 0) {
      return res(ctx.json([{
        "id": 1,
        "accountId": 1,
        "period": {
          "month": 12,
          "year": 2020
        }
      }]))
    } else {
      return res(ctx.json([]));
    }
  });
}

describe('BudgetApi mocked TCP/IP', () => {

  let api: BudgetApi;
  let server = setupServer(createGetBudgetsStub());

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        BudgetApi,
        ConfigProvider,
      ]
    });

    api = TestBed.inject(BudgetApi);
  });

  it('gets available budgets', (done) => {

    // when
    api.getBudgets(new Period(12, 2020)).subscribe((budgets) => {

      // then
      expect(budgets[0].id).toBeDefined();
      expect(budgets[0].accountId).toBeDefined();
      done();
    });

  });

  it('returns an empty array if no budgets', (done) => {

    // when
    api.getBudgets(new Period(0, 0)).subscribe((budgets) => {

      // then
      expect(budgets).toEqual([]);
      done();
    });

  });

});
