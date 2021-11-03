import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { Server } from "http";

import { Period } from './../src/app/models/period';
import { BudgetApi } from './../src/app/dashboard/api/budget.api';
import { ConfigProvider } from './../src/app/core/config.provider';
import { getRandomPort } from './random-port';
import mockserver from './mock-server';

describe('BudgetApi', () => {

  let api: BudgetApi;
  let config: ConfigProvider;
  let server: Server;
  let port: number;

  beforeAll((done) => {
    port = getRandomPort();
    server = mockserver().listen(port);
    done();
  });

  afterAll((done) => {
    server.close(done);
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
    config = TestBed.inject(ConfigProvider);

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
    api.getBudgets(new Period(12, 1900)).subscribe((budgets) => {

      // then
      expect(budgets).toEqual([]);
      done();
    });

  });

});
