import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { PasswordService } from "../../services/password.service";

@Component({
  selector: "recover",
  templateUrl: "./recover.component.html",
  styleUrls: ["./recover.component.scss"],
})
export class RecoverComponent implements OnInit {
  isRequestSent: boolean;
  public recoveryForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.isRequestSent = false;
    this.recoveryForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.recoveryForm.controls;
  }

  recover() {
    this.passwordService
      .requestRecovery(this.f.email.value)
      .subscribe(() => (this.isRequestSent = true));
  }
}
