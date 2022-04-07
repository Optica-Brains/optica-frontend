import { catchError, throwError, map } from 'rxjs';
import { environment } from './../../../environments/environment';
import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  fetch_all_users(filterRole?:number){
    return this.http.get<User[]>(`${environment.apiUrl}/api/users/`)
    .pipe(map(users => {
      if(filterRole){
        users = users.filter(user => user.groups && user.groups.includes(filterRole))
      }
      return users
    }))
      .pipe(catchError(error => {
        return throwError(`There was an fetching users`);
      }))
  }
}
