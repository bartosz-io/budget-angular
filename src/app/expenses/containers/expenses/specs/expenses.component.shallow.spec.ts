import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExpensesComponent } from '../expenses.component';
import { ExpenseCategoriesService } from '../../../services/expense-categories.service';
import { AUTH_STRATEGY } from '../../../../auth/services/auth.strategy';
import { AuthService } from '../../../../auth/services/auth.service';
import { ExpensesService } from '../../../services/expenses.service';
import { CacheService } from '../../../../core/cache.service';

describe('Shallow test: ExpensesComponent', () => {

  let fixture: ComponentFixture<ExpensesComponent>;
  let component: ExpensesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpensesComponent,
      ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: CacheService, useValue: {} },
        { provide: ExpensesService, useValue: {} },
        { provide: ExpenseCategoriesService, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: AUTH_STRATEGY, useValue: {} }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });
});
