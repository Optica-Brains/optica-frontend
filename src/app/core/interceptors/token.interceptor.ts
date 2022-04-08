import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isUserAuthenticated()) {
      let tokenObject = this.authService.getLoggedUserToken();
      if (tokenObject && tokenObject.access) {
        request = request.clone({
          setHeaders:
            { Authorization: `Bearer ${tokenObject.access}` }
        });
      }
      request = request.clone({
        setHeaders:
          { 'Content-Type': 'application/json' }
      });
    }
    return next.handle(request);
  }
}
