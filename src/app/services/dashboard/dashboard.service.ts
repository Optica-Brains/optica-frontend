import { Injectable } from '@angular/core';
import { Dashboard } from 'src/app/models/dashboard';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardSummary() {
    return this.http.get<Dashboard>(`${environment.apiUrl}/api/summary/`)
    .pipe(catchError(error => {
      return throwError(`There was an error fetching the dashboard summary`)
    }))
  }

}
