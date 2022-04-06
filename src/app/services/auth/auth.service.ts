import { Router } from '@angular/router';
import { TokenObject } from './../../models/token-object.model';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: Observable<User>;
  public userTokenObject!: Observable<TokenObject>;

  constructor(private http: HttpClient, private router:Router) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<void>(`${environment.apiUrl}/api/login/`, { email, password }, {withCredentials:  true})
      .pipe(map(token => {
        localStorage.setItem('token', JSON.stringify(token))
        return token
      })).pipe(catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
            errorMsg = `There was an error logging you in`;
        } else if (error instanceof HttpErrorResponse) {
            errorMsg = "You provided incorrect login credentials";
        }

        return throwError(errorMsg);
    }))
  }

  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  getLoggedUserToken():TokenObject{
    return JSON.parse(localStorage.getItem("token") ?? '');
  }

  getLoggedUserDetails(): User {
    return JSON.parse(localStorage.getItem("user") ?? '');
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

}
