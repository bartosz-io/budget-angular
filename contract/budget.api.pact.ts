import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { Pact } from '@pact-foundation/pact';

import { Period } from './../src/app/models/period';
import { BudgetApi } from './../src/app/dashboard/api/budget.api';
import { ConfigProvider } from './../src/app/core/config.provider';
import { getAvailableBugets, getUnavailableBugets } from './get-budgets.interactions';

jest.setTimeout(10000);

describe('BudgetApi', () => {

  let api: BudgetApi;
  let provider: Pact;
  let port: number;

  beforeAll(async () => {
    port = 8080; // IDEA: use random port
    provider = new Pact({
      port: port,
      consumer: 'BudgetClient',
      provider: 'BudgetProvider',
      host: 'localhost',
      dir: './../pacts',
      log: './logs',
      cors: true,
    });

    await provider.setup();
  });

  afterAll(async () => {
    await provider.finalize();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        BudgetApi,
        {
          provide: ConfigProvider,
          useValue: {
            getConfig: () => ({ apiUrl: `http://localhost:${port}` })
          }
        }
      ]
    });

    api = TestBed.inject(BudgetApi);
  });

  describe('when a call to the API is made', () => {

    beforeAll(async () => {
      await provider.addInteraction(getAvailableBugets);
      await provider.addInteraction(getUnavailableBugets);
    });

    it('gets available budgets', (done) => {

      // when
      api.getBudgets(new Period(3, 2020)).subscribe((budgets) => {

        // then
        expect(budgets[0].id).toBeDefined();
        expect(budgets[0].accountId).toBeDefined();
        done();
      });
    });

    it('returns an empty array if no budgets', (done) => {

      // when
      api.getBudgets(new Period(12, 1900)).subscribe((budgets) => {

        // then
        expect(budgets).toEqual([]);
        done();
      });
    });

  });

});
