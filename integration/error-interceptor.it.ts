import { TestBed } from "@angular/core/testing";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Server } from "http";

import { Period } from "./../src/app/models/period";
import { BudgetApi } from "./../src/app/dashboard/api/budget.api";
import { ConfigProvider } from "./../src/app/core/config.provider";
import { HttpErrorHandler } from "./../src/app/core/error.handler";
import { HttpErrorInterceptor } from "./../src/app/core/error.interceptor";
import { getRandomPort } from "./random-port";
import mockserver from "./mock-server";

const mockErrorHandler = {
  handleError: jest.fn(),
} as Pick<HttpErrorHandler, "handleError">;

describe("HttpErrorInterceptor", () => {
  let api: BudgetApi;
  let config: ConfigProvider;
  let server: Server;
  let port: number;

  beforeAll((done) => {
    port = getRandomPort();
    server = mockserver("empty-db.json").listen(port, () => done());
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        BudgetApi,
        {
          provide: ConfigProvider,
          useValue: {
            getConfig: () => ({ apiUrl: `http://localhost:${port}` }),
          },
        },
        {
          provide: HttpErrorHandler,
          useValue: mockErrorHandler,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });

    api = TestBed.inject(BudgetApi);
    config = TestBed.inject(ConfigProvider);
  });

  it("throws error with 404 status code when no data", (done) => {
    // when
    api.getBudgets(new Period(12, 2020)).subscribe({
      error: (error) => {
        // then
        expect(error.status).toBe(404);
        done();
      },
    });
  });

  it("calls error handler when error thrown", (done) => {
    // when
    api.getBudgets(new Period(12, 2020)).subscribe({
      error: () => {
        // then
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
        done();
      },
    });
  });
});
