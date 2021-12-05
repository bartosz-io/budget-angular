import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../shared/components/snackbar/snackbar.component";

@Injectable()
export class HttpErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: error.error?.msg ?? "Unknown error",
    });
  }
}
