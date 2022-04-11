import { Role } from './../../models/role.model';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route.data['roles']);
      
      const roles = route.data['roles'] as Role[];
      if (roles && !roles.some(r => this.authService.hasRole(r))) {
          this.router.navigate(['/']);
          return false;
      }

      return true;
  }
  
}
