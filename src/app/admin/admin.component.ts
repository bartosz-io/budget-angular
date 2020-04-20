import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public userEmail$: Observable<string>;
  public sessions = new MatTableDataSource();

  constructor(private authService: AuthService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.userEmail$ = this.authService.getUserEmail$();
    this.loadSessions$().subscribe();
  }

  loadSessions$() {
    return this.adminService.getActiveSessions()
      .pipe(map(data => this.sessions.data = data));
  }

  confirmDelete(sessionId: string) {
    this.adminService.destroySession(sessionId)
      .pipe(switchMap(() => this.loadSessions$()))
      .subscribe();
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate([this.authService.LOGIN_PATH]);
      });
  }

}
