import { of } from 'rxjs';

import { DashboardService } from './../../dashboard.service';
import { DashboardComponent } from './dashboard.component';
import { PeriodService } from './../../../shared/services/period.service';

describe('Isolated test: DashboardComponent', () => {

  let component: DashboardComponent;
  let periodServiceMock: Pick<PeriodService, 'getCurrentPeriod'>;
  let dashboardServiceMock: Pick<DashboardService, 'getBudgetSummary' | 'getBudgets'>;

  beforeEach(() => {
    periodServiceMock = {
      getCurrentPeriod: jest.fn()
    };
    dashboardServiceMock = {
      // this is a tricky part - we need to return an empty RxJS stream - of(), can you guess why? :)
      getBudgets: jest.fn(() => of()),
      getBudgetSummary: jest.fn()
    }
    component = new DashboardComponent(
      dashboardServiceMock as DashboardService,
      periodServiceMock as PeriodService,
    )
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('initializes the period and budgets', () => {

    // when
    component.ngOnInit();
    // in isolated test ngOnInit() method will not be invoked, so we need to call it manually

    // then
    expect(periodServiceMock.getCurrentPeriod).toHaveBeenCalled();
    expect(dashboardServiceMock.getBudgetSummary).toHaveBeenCalled();
    expect(dashboardServiceMock.getBudgets).toHaveBeenCalled();
  });
});
