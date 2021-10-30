import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ExpensesComponent } from './../expenses.component';
import { ExpenseCategoriesService } from '../../../services/expense-categories.service';
import { PeriodService } from './../../../../shared/services/period.service';
import { ExpensesService } from './../../../services/expenses.service';
import { AuthService } from '../../../../auth/services/auth.service';

describe('Isolated test: ExpensesComponent', () => {

  let component: ExpensesComponent;
  let periodServiceMock: Pick<PeriodService, 'getCurrentPeriod'>;

  beforeEach(() => {
    periodServiceMock = {
      getCurrentPeriod: jest.fn()
    };
    component = new ExpensesComponent(
      {} as AuthService,
      periodServiceMock as PeriodService,
      {} as ExpensesService,
      {} as ExpenseCategoriesService,
      {} as MatDialog,
      {} as MatSnackBar);
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('initializes the period', () => {
    expect(periodServiceMock.getCurrentPeriod).toHaveBeenCalled();
  });
});
