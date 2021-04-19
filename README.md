# Budget application

This is the final project in the training program [Web Security Academy](https://websecurity-academy.com/?utm_source=github&utm_medium=referral&utm_campaign=budget-angular-readme). It represents a real-life use case of personal money tracker. There are five main feature modules: *Auth*, *Dashboard*, *Expenses*, *Settings* and *Admin* with many security measures implemented described below. The project implements [role-based access control](https://en.wikipedia.org/wiki/Role-based_access_control) (RBAC), giving different users different permissions. This is the frontend part to the accompanying [backend api](https://github.com/bartosz-io/budget-node) in Node.js with TypeScript. A deployed version (with mocked in-memory API) is available under https://budget.dev-academy.com.

## Installation

```bash
npm install
ng serve
```

## Running

There are two ways you can run the Angular part:

1) As a standalone Angular application with `ng serve`
2) From node project with `ng build --watch`
    - Angular distribution will be avaiable in `dist/`
    - Angular and Node application must reside in the some folder
    - Angular application must reside in `angular` filder
    - Node application will look for Angular build in `/angular/dist/` thanks to `app.use(express.static('../angular/dist/'));`

## Main modules

| Auth | Dashboard | Expenses | Settings | Admin |
| ------ |  ------ | ------ | ----- | ----- |
| Login, signup and recover password | Read budgets and account summary | List and manage the expenses belonging to the account | Manage account users and expense categories for account | Manage active sessions of logged users |
| ![Login](/docs/login.png) | ![Dashboard](/docs/dashboard.png) | ![Expenses](/docs/expenses.png) | ![Settings](/docs/settings.png) | ![Admin](/docs/admin.png) |

## Roles in the system

| Role | Permission |
| ------ | ------ |
| Reader | Read expenses and categories for the account. |
| Owner | Create, read, update and delete expenses, categories. Create and delete account's users.  |
| Admin | Read and delete active users' sessions. |

## Domain model

- Each user **belongs to** one account.
- Each account **may have** multiple users.
- Each expense **belongs to** one account.
- Each account **may have** multiple expenses.

![Domain](/docs/domain%20model.png)

## Authentication mechanisms

There are two authentication mechanism implemented in both Angular and Node.js parts:

- Session cookies
- JWT Tokens

In Angular part you can select one mechanism with config setting in `src/app/core/config.ts` as presented below.
Remember that both Angular and Node.js selections must match!

```ts
interface Config {
  [key: string]: string;
  auth: 'session' | 'token';
}

export const config: Config = {
  auth: 'token' // type-safe
};
```

## Mocked API

You can run the Angular application with completly mocked backend API. To do this you need to import and initalize `HttpClientInMemoryWebApiModule` in `CoreModule` as in the code snippet below. Make sure it is imported **after** `HttpClientModule`.

Once initalized, all the HTTP request will return mocked data thanks to `mock.api.ts` and `src/app/mocks/*`. The application deployed to budget.angular-academy.com is using that mocked data. Note, that **not all** of the data associations are reflected with mocks (as with the real backend API), but most of the features are available.

```ts
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockApi } from './../mocks/mock.api'; // mocks are defined here 😎

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockApi, { passThruUnknownUrl: true, delay: 1000 }),
  ],
  declarations: [...],
  providers: [...],
  exports: [...]
})
export class CoreModule { }
```

## Implemented security measures

> **_NOTE:_**  The security measures on the frontend part are not enought to protect the user. Make sure to check the description of security measures in the backend application in [Node repository](https://github.com/bartosz-io/budget-node).

### Content Security Policy

In `index.html` there are CSP directives defined to prevent unintended code from execution (Cross-site scripting). Unfortunatelly Angular injects inline styles in the build and `'unsafe-inline'` is a must for `style-src`. Note, that CSP reporting is not possible to be setup with `meta` tags.

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    connect-src 'self';
    font-src data:;
    style-src 'self' 'unsafe-inline'">
```

### XSRF prevention

Built-in mechanism of Angular's `'@angular/common/http'` library is used to receive and send **anti-xsrf tokens**. This requires proper handling on the backend part.

```ts
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-Token',
      headerName: 'XSRF-Token',
    }),
  ],
  declarations: [...],
  providers: [..],
  exports: [..]
})
export class CoreModule { }
```

### Conditional components visibility

Particular components are visible to the users with specified roles. For example a **reader** doesn't see a button to create a new expense. It's possible thanks to custom structural directive `forRoles` (only **owner** sees the button).

```html
<button mat-fab color="primary" (click)="openExpenseDialog()" *forRoles="['owner']">+</button>
```

<img src="/docs/reader expenses.png" width="300">

Directive implementation:

```ts
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[forRoles]'
})
export class ForRolesDirective {

  roles: string[];

  @Input()
  set forRoles(roles: string[]|string) {
    if (roles != null) {
      this.roles = Array.isArray(roles) ? roles : [roles];
      this.roles = this.roles.map(r => r.toUpperCase());
    } else {
      this.roles = [];
    }

    this.authService.getUserRole$().subscribe(
      role => {
        if (role && !this.roles.includes(role.toUpperCase())) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    );
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) { }

}

```

## License

GPL-3.0
