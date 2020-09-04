import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/components/snackbar/snackbar.component';
import { config } from '../core/config';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // when Node backend is not running, then logged user query fails; let's not show error
        if (!this.isQueryForLoggedUser(error)) {
          this.showErrorMessage(error);
        }
        return throwError(error);
      }));
  }

  private isQueryForLoggedUser(error: HttpErrorResponse) {
    return error.url.endsWith(`${config.authUrl}/user`);
  }

  private showErrorMessage(error: HttpErrorResponse) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: error.error.msg ?? 'Unknown error'
    });
  }

}
