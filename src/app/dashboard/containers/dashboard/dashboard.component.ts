import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { DashboardService } from './../../dashboard.service';
import { PeriodService } from '../../../shared/services/period.service';
import { BudgetSummary } from '@models/budgetSummary';
import { Budget } from '@models/budget';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  budgetSummary$: Observable<BudgetSummary>;
  budgets: Budget[];
  budgetsSub: Subscription;
  budgetsLoaded = false;

  constructor(private dashboard: DashboardService, private periodService: PeriodService) {}

  ngOnInit() {
    const period = this.periodService.getCurrentPeriod();
    this.budgetSummary$ = this.dashboard.getBudgetSummary(period);
    this.budgetsSub = this.dashboard.getBudgets(period).subscribe(budgets => {
      this.budgets = budgets;
      this.budgetsLoaded = true;
    });
  }

  ngOnDestroy() {
    this.budgetsSub.unsubscribe();
  }

}
