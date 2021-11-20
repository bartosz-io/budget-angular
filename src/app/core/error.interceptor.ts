import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpErrorHandler } from "./error.handler";
import { config } from "../core/config";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private handler: HttpErrorHandler) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!this.isErrorMessageSuppressed(error)) {
          this.showErrorMessage(error);
        }
        return throwError(error);
      })
    );
  }

  private isErrorMessageSuppressed(error: HttpErrorResponse) {
    return this.isQueryForLoggedUser(error) || this.isOtpRequired(error);
  }

  // when Node backend is not running, then logged user query fails; let's not show the error
  private isQueryForLoggedUser(error: HttpErrorResponse) {
    return error.url.endsWith(`${config.authUrl}/user`);
  }

  private isOtpRequired(error: HttpErrorResponse) {
    return error.error.msg === "OTP_REQUIRED";
  }

  private showErrorMessage(error: HttpErrorResponse) {
    this.handler.handleError(error);
  }
}
