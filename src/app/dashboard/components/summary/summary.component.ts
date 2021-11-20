import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { BudgetSummary } from "@models/budgetSummary";

@Component({
  selector: "summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  @Input()
  budgetSummary: BudgetSummary;

  ngOnInit() {}
}
