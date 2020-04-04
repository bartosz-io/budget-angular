import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SharedModule } from './../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { MenuItemDirective } from './menu-item.directive';
import { HttpErrorInterceptor } from './error.interceptor';
import { MockApi } from './../mocks/mock.api';
import { CacheService } from './cache.service';

registerLocaleData(localePl);

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-Token',
      headerName: 'XSRF-Token',
    }),
    // HttpClientInMemoryWebApiModule.forRoot(MockApi, { passThruUnknownUrl: true, delay: 1000 }),
    BrowserAnimationsModule,
    MatProgressBarModule,
    SharedModule,
    RouterModule,
    MatNativeDateModule
  ],
  declarations: [
    LayoutComponent,
    MenuItemDirective
  ],
  providers: [
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  exports: [LayoutComponent]
})
export class CoreModule { }
