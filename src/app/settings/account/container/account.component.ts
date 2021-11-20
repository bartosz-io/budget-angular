import { Component, OnInit } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of, throwError } from "rxjs";
import { map, switchMap, catchError, tap, filter } from "rxjs/operators";

import { AuthService } from "../../../auth/services/auth.service";
import { AccountService } from "../account.service";
import { UserDialogComponent } from "../components/user-dialog/user-dialog.component";
import { SecretDialogComponent } from "../components/secret-dialog/secret-dialog.component";
import { SnackBarComponent } from "../../../shared/components/snackbar/snackbar.component";
import { User } from "@models/user";

@Component({
  selector: "account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  isAuth0 = false;
  tfaEnabled = false;
  ownEmail: string;
  isLoading = false;
  users = new MatTableDataSource<User>();
  displayedColumns = ["email", "role", "confirmed", "actions"];
  showSecretLabel = "Show secret code";

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe((user) => {
      this.ownEmail = user.email;
      this.tfaEnabled = user.tfa;
      this.isAuth0 = this.authService.isAuth0User(user);
    });
    this.authService
      .getUserRole$()
      .pipe(
        filter((role) => role === "OWNER"),
        switchMap(() => this.loadUsers$())
      )
      .subscribe();
  }

  openUserDialog() {
    this.dialog.open<UserDialogComponent>(UserDialogComponent, {
      data: {
        callback$: this.getCreateUserCallback$(),
      },
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: "100%",
      width: "100%",
    });
  }

  updateTfa(change: MatSlideToggleChange) {
    const isEnabled = change.checked;
    this.isLoading = true;
    this.authService
      .getCurrentUser$()
      .pipe(
        switchMap((user) => this.accountService.toggleTfa(user.id, isEnabled)),
        tap(() => (this.isLoading = false)),
        catchError((errorResponse) => {
          this.isLoading = false;
          this.tfaEnabled = !isEnabled; // rollback the change on UI
          this.showResultSnackbar(errorResponse.error?.msg ?? "Unknown error");
          return throwError(errorResponse);
        })
      )
      .subscribe(() =>
        this.showResultSnackbar(
          `Two-factor authentication ${isEnabled ? "enabled" : "disabled"}`
        )
      );
  }

  showSecretCode() {
    this.showSecretLabel = "Please wait...";
    this.accountService.getSecret().subscribe((result) => {
      this.dialog.open<SecretDialogComponent>(SecretDialogComponent, {
        data: result.keyuri,
      });
      this.showSecretLabel = "Show secret code";
    });
  }

  confirmDelete(id: string) {
    this.isLoading = true;
    this.accountService
      .deleteUser(id)
      .pipe(
        switchMap(() => this.loadUsers$()),
        tap(() => (this.isLoading = false)),
        catchError((errorResponse) => {
          this.isLoading = false;
          this.showResultSnackbar(errorResponse.error?.msg ?? "Unknown error");
          return throwError(errorResponse);
        })
      )
      .subscribe(() => this.showResultSnackbar("User deleted"));
  }

  logoutAuth0() {
    this.authService.logoutAuth0();
  }

  private loadUsers$() {
    return this.accountService
      .getUsers()
      .pipe(map((data) => (this.users.data = data)));
  }

  private getCreateUserCallback$(): (user: User) => Observable<void> {
    return (user: User) =>
      this.accountService.createUser(user).pipe(
        switchMap(() => this.loadUsers$()),
        tap(() => this.showResultSnackbar("Success")),
        catchError((errorResponse) => {
          this.showResultSnackbar(errorResponse.error?.msg ?? "Unknown error");
          return of(errorResponse);
        })
      );
  }

  private showResultSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: message,
    });
  }
}
