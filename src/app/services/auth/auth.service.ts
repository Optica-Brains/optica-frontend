import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: Observable<User>;

  constructor(private http: HttpClient) { }

  public login(email: String, password: String): Observable<any> {
    return this.http.post<void>(`${environment.apiUrl}/api/login`, { email, password }).pipe(retry(1))
  }

}
