import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Component } from "@angular/core";
import { PeriodService } from "../../services/period.service";

@Component({
  selector: "period-selector",
  templateUrl: "./period-selector.component.html",
  styleUrls: ["./period-selector.component.scss"],
})
export class PeriodSelectorComponent {
  month: number;
  year: number;

  constructor(
    periodService: PeriodService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "left",
      sanitizer.bypassSecurityTrustResourceUrl("assets/left.svg")
    );
    iconRegistry.addSvgIcon(
      "right",
      sanitizer.bypassSecurityTrustResourceUrl("assets/right.svg")
    );

    this.month = periodService.getCurrentPeriod().month;
    this.year = periodService.getCurrentPeriod().year;
  }
}
