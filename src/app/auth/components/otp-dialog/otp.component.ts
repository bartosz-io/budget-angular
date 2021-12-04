import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.scss"],
})
export class OtpComponent {
  constructor(
    private dialogRef: MatDialogRef<OtpComponent>,
    @Inject(MAT_DIALOG_DATA) public otpValue: string
  ) {}

  verify(result: string) {
    this.dialogRef.close(result);
  }
}
