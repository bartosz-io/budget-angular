import { BudgetApi } from './api/budget.api';
import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SummaryComponent } from './components/summary/summary.component';
import { BudgetProgressComponent } from './components/budget-progress/budget-progress.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    SummaryComponent,
    BudgetProgressComponent
  ],
  exports: [ DashboardComponent ],
  providers: [ DashboardService, BudgetApi ]
})
export class DashboardModule { }
