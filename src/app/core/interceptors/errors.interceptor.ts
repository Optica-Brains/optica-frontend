import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
          this.authService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
  }))
  }
}
