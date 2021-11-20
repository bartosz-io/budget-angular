import { Component, Inject, ViewEncapsulation, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

import { Expense } from "@models/expense";
import { ExpenseCategory } from "@models/expenseCategory";

export interface ExpenseDialogData {
  expense?: Expense;
  categories?: ExpenseCategory[];
  callback$: SubmitExpenseCallback;
}

export type SubmitExpenseCallback = (expense: Expense) => Observable<void>;

@Component({
  selector: "expense-dialog",
  templateUrl: "expense-dialog.component.html",
  styleUrls: ["expense-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseDialogComponent implements OnInit {
  expenseForm: FormGroup;
  expense: Expense;
  newCategory = new ExpenseCategory();
  categories: ExpenseCategory[] = [];
  submitText: string;
  inProgress: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDialogData
  ) {}

  ngOnInit() {
    this.inProgress = false;
    this.submitText = this.expense ? "Update" : "Save";
    this.expense = this.data.expense ?? new Expense();
    this.categories = this.data.categories;

    this.expenseForm = this.fb.group({
      id: [this.expense.id],
      datetime: [this.expense.datetime, Validators.required],
      counterparty: [this.expense.counterparty, Validators.required],
      categoryId: [this.expense.categoryId, Validators.required],
      value: [this.expense.value, Validators.required],
    });
  }

  submit() {
    this.inProgress = true;
    this.submitText = "Please wait...";
    const newExpense = Object.assign(new Expense(), this.expenseForm.value);
    this.data.callback$(newExpense).subscribe(() => this.dialogRef.close());
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
