import { environment } from './../../../environments/environment';
import { map, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  constructor(private http: HttpClient) { }

  createBatch(branch_to: number, messenger: number, orders: object) {
    return this.http.post(`${environment.apiUrl}/api/batches/`,
      { branch_to, messenger, orders, batch_number: this.generateBatchNumber() })
      .pipe(catchError(error => {
        return throwError(`There was an error creating the batch`);
      }))
  }

  fetchBatches(filterBranch?: number) {

  }

  generateBatchNumber() {
    let now = Date.now().toString()
    now += now + Math.floor(Math.random() * 10)
    // format
    return [now.slice(0, 4), now.slice(4, 10)].join('-')
  }
}
