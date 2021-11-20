import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "secret-dialog",
  templateUrl: "./secret-dialog.component.html",
})
export class SecretDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SecretDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public keyuri: string
  ) {}
}
