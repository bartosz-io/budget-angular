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
