import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
  private roles: string[] = [];

  @Input() set appHasRole(role: string | string[]) {
    this.roles = Array.isArray(role) ? role : [role];
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();

    const userRoles = this.authService.getRoles();
    const hasRole = this.roles.some((role) => userRoles.includes(role));

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
