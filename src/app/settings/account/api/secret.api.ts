import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { config } from "../../../core/config";

@Injectable()
export class SecretApi {
  private readonly API_URL = `${config.apiUrl}/secret`;

  constructor(private http: HttpClient) {}

  getSecret(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }
}
