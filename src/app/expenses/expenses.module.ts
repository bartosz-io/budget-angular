import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ExpenseApi } from './api/expense.api';
import { ExpensesService } from './services/expenses.service';
import { ExpensesComponent } from './containers/expenses/expenses.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { ExpenseDialogComponent } from './components/expense-dialog/expense-dialog-component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ExpensesRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    ExpensesComponent,
    ExpensesTableComponent,
    ConfirmDeleteComponent,
    ExpenseDialogComponent
  ],
  entryComponents: [ExpenseDialogComponent, ConfirmDeleteComponent],
  providers: [ExpensesService, ExpenseApi]
})
export class ExpensesModule { }
