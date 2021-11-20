import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";

import { Budget } from "@models/budget";

@Component({
  selector: "budget-progress",
  templateUrl: "./budget-progress.component.html",
  styleUrls: ["./budget-progress.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetProgressComponent implements OnInit {
  @Input()
  budget: Budget;
  today: string;

  ngOnInit() {
    this.today = "60%";
  }
}
