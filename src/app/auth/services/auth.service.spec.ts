import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { Period } from "@models/period";
import { ConfigProvider } from "./../../core/config.provider";
import { BudgetApi } from "./../../dashboard/api/budget.api";
import { DashboardService } from "./../../dashboard/dashboard.service";
import { CacheService } from "../../core/cache.service";
import { AuthService } from "./auth.service";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { AUTH_STRATEGY } from "./auth.strategy";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        AuthService,
        CacheService,
        DashboardService,
        BudgetApi,
        ConfigProvider,
        {
          provide: AUTH_STRATEGY,
          useClass: JwtAuthStrategy,
        },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it("creates the service", () => {
    expect(service).toBeTruthy();
  });

  // output-based style
  it("gives initial path for ADMIN", () => {
    // given
    const userRole = "ADMIN";

    // when
    const path = service.getInitialPathForRole(userRole);

    // then
    expect(path).toBe(service.ADMIN_PATH);
  });

  it("gives initial path for OWNER", () => {
    // given
    const userRole = "OWNER";

    // when
    const path = service.getInitialPathForRole(userRole);

    // then
    expect(path).toBe(service.INITIAL_PATH);
  });

  // state-based style
  it("logout prunes the cache (state check)", () => {
    // given
    const router = TestBed.inject(Router); // we don't need router in this test
    jest
      .spyOn(router, "navigate")
      .mockImplementation(() => Promise.resolve(true));

    const budgetApi = TestBed.inject(BudgetApi);
    jest.spyOn(budgetApi, "getBudgets").mockImplementation(() => of());

    const dashboardService = TestBed.inject(DashboardService);
    dashboardService.getBudgets(new Period(1, 2000)); // init the cache

    // when
    service.doLogoutAndRedirectToLogin();

    // then
    expect(dashboardService["budgets"]).toBeNull();
  });

  // communication-based style
  it("logout prunes the cache (communication check)", () => {
    // given
    const router = TestBed.inject(Router); // we don't need router in this test
    jest
      .spyOn(router, "navigate")
      .mockImplementation(() => Promise.resolve(true));

    const cacheService = TestBed.inject(CacheService);
    jest.spyOn(cacheService, "pruneAll").mockImplementation(() => {});

    // when
    service.doLogoutAndRedirectToLogin();

    // then
    expect(cacheService.pruneAll).toHaveBeenCalledTimes(1);
  });
});

describe("AuthService isolated", () => {
  let service;

  it("creates the service", () => {
    service = new AuthService(
      {} as Router,
      {} as HttpClient,
      {} as CacheService,
      {} as JwtAuthStrategy
    );
    expect(service).toBeTruthy();
  });
});
