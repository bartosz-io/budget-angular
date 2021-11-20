import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { BudgetSummary } from "@models/budgetSummary";

@Component({
  selector: "summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  @Input()
  budgetSummary: BudgetSummary;
}
