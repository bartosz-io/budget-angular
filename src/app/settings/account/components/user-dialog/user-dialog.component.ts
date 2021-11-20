import { Component, Inject, ViewEncapsulation, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@models/user";
import { Role } from "@models/types";

@Component({
  selector: "user-dialog",
  templateUrl: "user-dialog.component.html",
  styleUrls: ["user-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserDialogComponent implements OnInit {
  user: User;
  roles: Role[];
  userForm: FormGroup;
  inProgress: boolean;
  submitText: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.user = new User();
    this.roles = ["OWNER", "READER"];
    this.inProgress = false;
    this.submitText = "Create";

    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
    });
  }

  submit() {
    this.inProgress = true;
    this.submitText = "Please wait...";
    const newUser = Object.assign(new User(), this.userForm.value);
    this.data.callback$(newUser).subscribe(() => this.dialogRef.close());
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
