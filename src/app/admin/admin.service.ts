import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { config } from "./../core/config";

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  getActiveSessions(): Observable<[]> {
    return this.http.get<[]>(`${config.adminUrl}/sessions`);
  }

  destroySession(sessionId: string): Observable<[]> {
    return this.http.delete<[]>(`${config.adminUrl}/sessions/${sessionId}`);
  }
}
