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

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenObject = this.authService.getLoggedUserToken();
    if (tokenObject && tokenObject.token) { 
      request = request.clone({ setHeaders:
            { Authorization: `Bearer ${tokenObject.token}` } }); } 
    return next.handle(request);
  }
}
