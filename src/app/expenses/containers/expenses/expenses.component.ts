import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, Subscription, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap, switchMap, catchError, filter } from 'rxjs/operators';

import { ExpenseDialogComponent, ExpenseDialogData, SubmitExpenseCallback } from '../../components/expense-dialog/expense-dialog-component';
import { ExpenseCategoriesService } from '../../services/expense-categories.service';
import { ExpensesService } from '../../services/expenses.service';
import { AuthService } from '../../../auth/services/auth.service';
import { PeriodService } from '../../../shared/services/period.service';
import { SnackBarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { Expense } from '@models/expense';
import { ExpenseCategory } from '@models/expenseCategory';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('filter', { static: true }) filter: ElementRef;
  dataSource = new MatTableDataSource();
  displayedColumns = ['datetime', 'counterparty', 'category', 'value'];
  keyupSubscription: Subscription;
  isLoading = true;
  expenseCategories: ExpenseCategory[];
  period = this.periodService.getCurrentPeriod();

  constructor(
    private authService: AuthService,
    private periodService: PeriodService,
    private expensesService: ExpensesService,
    private expensesCategoryService: ExpenseCategoriesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadTable$().subscribe();
    this.authService.getUserRole$()
      .pipe(filter(role => role === 'OWNER'))
      .subscribe(() => this.adaptToOwnersRole());
  }

  adaptToOwnersRole() {
    this.displayedColumns.push('actions');
    this.expensesCategoryService.getExpenseCategories().subscribe(categories => {
      this.expenseCategories = categories;
    });
  }

  ngAfterViewInit() {
    this.keyupSubscription = fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(value => this.expensesService.filterExpenses(this.period, value)),
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.dataSource.data = data;
      });
  }

  ngOnDestroy() {
    this.keyupSubscription.unsubscribe();
  }

  openExpenseDialog() {
    this.dialog.open<ExpenseDialogComponent, ExpenseDialogData>(ExpenseDialogComponent, {
      data: {
        categories: this.expenseCategories,
        callback$: this.getSubmitExpenseCallback$()
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }

  loadTable$() {
    this.isLoading = true;
    return this.expensesService.getExpenses(this.period)
      .pipe(
        map((data) => {
          this.isLoading = false;
          this.dataSource.data = data;
        }));
  }

  getLoadTableCallback$() {
    return (() => this.loadTable$());
  }

  getSubmitExpenseCallback$(): SubmitExpenseCallback {
    return (expense: Expense) => this.expensesService.createOrUpdateExpense(expense)
      .pipe(
        switchMap(() => this.loadTable$()),
        tap(() => this.showResultSnackbar('Success')),
        catchError((errorResponse) => {
          this.showResultSnackbar(errorResponse.error?.msg ?? 'Unknown error');
          return of(errorResponse);
        })
      );
  }

  private showResultSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: message
    });
  }

}
