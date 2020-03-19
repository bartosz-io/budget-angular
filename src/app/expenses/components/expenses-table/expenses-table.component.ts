import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDeleteComponent, DeleteExpenseCallback, DeleteExpenseData } from '../../components/confirm-delete/confirm-delete.component';
import { ExpenseDialogComponent, SubmitExpenseCallback, ExpenseDialogData } from '../expense-dialog/expense-dialog-component';
import { Expense } from '@models/expense';
import { ExpenseCategory } from '@models/expenseCategory';

@Component({
  selector: 'expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesTableComponent {

  @Input()
  dataSource: DataSource<Expense[]>;

  @Input()
  displayedColumns: string[];

  @Input()
  categories: ExpenseCategory[];

  @Input()
  deleteCallback: DeleteExpenseCallback;

  @Input()
  submitCallback: SubmitExpenseCallback;

  constructor(private bottomSheet: MatBottomSheet, private dialog: MatDialog) { }

  edit(expense: Expense) {
    this.dialog.open<ExpenseDialogComponent, ExpenseDialogData>(ExpenseDialogComponent, {
      data: {
        expense: expense,
        categories: this.categories,
        callback$: this.submitCallback
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }

  confirmDelete(expenseId: string) {
    this.bottomSheet.open<ConfirmDeleteComponent, DeleteExpenseData>(ConfirmDeleteComponent, {
      data: {
        expenseId: expenseId,
        callback$: this.deleteCallback
      }
    });
  }
}
