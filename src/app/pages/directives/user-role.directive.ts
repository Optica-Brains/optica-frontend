import { Role } from './../../models/role.model';
import { AuthService } from './../../services/auth/auth.service';
import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) { }

  userRoles!: Role[];

  @Input()
  set appUserRole(roles: Role[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }
    this.userRoles = roles;
  }
  ngOnInit() {
    let hasAccess = false;
    if (this.authService.isUserAuthenticated() && this.userRoles) {
      hasAccess = this.userRoles.some(r => this.authService.hasRole(r));
    }
    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
