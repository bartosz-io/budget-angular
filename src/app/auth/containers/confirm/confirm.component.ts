import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"],
})
export class ConfirmComponent implements OnInit {
  isConfirmed = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const email = this.activeRoute.snapshot.queryParams.email;
    const code = this.activeRoute.snapshot.queryParams.code;

    if (email && code) {
      this.authService
        .confirm(email, code)
        .subscribe(() => (this.isConfirmed = true));
    }
  }
}
