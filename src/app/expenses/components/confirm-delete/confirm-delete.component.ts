import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ExpensesService } from '../../services/expenses.service';

export interface DeleteExpenseData {
  expenseId: string;
  callback$: DeleteExpenseCallback;
}

export type DeleteExpenseCallback = () => Observable<void>;

@Component({
  selector: 'confirm-delete',
  templateUrl: 'confirm-delete.template.html',
})
export class ConfirmDeleteComponent implements OnInit {

  inProgress: boolean;
  confirmText: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmDeleteComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: DeleteExpenseData,
    private expenseSevice: ExpensesService) {}

  ngOnInit() {
    this.inProgress = false;
    this.confirmText = 'Confirm';
  }

  confirm(): void {
    this.inProgress = true;
    this.confirmText = 'Please wait...';
    this.expenseSevice.deleteExpense(this.data.expenseId)
      .pipe(switchMap(() => this.data.callback$()))
      .subscribe(() => this.bottomSheetRef.dismiss());
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }

}
