import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";

import { ConfigProvider } from "./../../../core/config.provider";
import { SummaryComponent } from "./../../components/summary/summary.component";
import { BudgetProgressComponent } from "./../../components/budget-progress/budget-progress.component";
import { DashboardComponent } from "./dashboard.component";
import { PeriodService } from "./../../../shared/services/period.service";
import { DashboardService } from "./../../dashboard.service";
import { CacheService } from "./../../../core/cache.service";
import { BudgetApi } from "./../../api/budget.api";

describe("Deep test: DashboardComponent", () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        BudgetProgressComponent,
        SummaryComponent,
      ],
      imports: [HttpClientModule, MatCardModule, MatProgressSpinnerModule],
      providers: [
        DashboardService,
        PeriodService,
        BudgetApi,
        ConfigProvider,
        CacheService,
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it("creates the component", () => {
    expect(component).toBeTruthy();
  });
});
