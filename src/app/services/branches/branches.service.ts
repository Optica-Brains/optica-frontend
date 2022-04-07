import { map, catchError, throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Branch } from './../../models/branch.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http:HttpClient) { }

  fetch_all_branches(filterBranch?:number){
    return this.http.get<Branch[]>(`${environment.apiUrl}/api/branches/`)
    .pipe(map(branches => {
      if(filterBranch){
        branches = branches.filter(branch => branch.id != filterBranch)
      }
      return branches
    }))
      .pipe(catchError(error => {
        return throwError(`There was an fetching branches`);
      }))
  }
}
