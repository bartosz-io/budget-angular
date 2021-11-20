import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: "snack-bar",
  templateUrl: "./snackbar.component.html",
  styles: [
    ".mat-snack-bar-handset .mat-snack-bar-container { margin: 24px 24px 90px 24px }",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
