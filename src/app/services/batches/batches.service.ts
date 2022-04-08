import { Batch } from './../../models/batch.model';
import { Branch } from './../../models/branch.model';
import { environment } from './../../../environments/environment';
import { map, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  constructor(private http: HttpClient) { }

  createBatch(branch_to_id: number, messenger_id: number, orders: object, branch_from_id:number) {
    return this.http.post(`${environment.apiUrl}/api/batches/`,
      { branch_from_id, branch_to_id, messenger_id, batch_orders: orders, batch_number: this.generateBatchNumber() })
      .pipe(catchError(error => {
        return throwError(`There was an error creating the batch`);
      }))
  }

  fetchBatches(filterBranch?: string) {
    return this.http.get<Batch[]>(`${environment.apiUrl}/api/batches/`)
    .pipe(map(batches => {
      if(filterBranch){
        
        batches = batches.filter(batch => batch.branch_from?.id == filterBranch || batch.branch_to?.id == filterBranch)
      }
      return batches
    }))
      .pipe(catchError(error => {
        return throwError(`There was an error fetching batches`);
      }))

  }

  generateBatchNumber() {
    let now = Date.now().toString()
    now += now + Math.floor(Math.random() * 10)
    // format
    return [now.slice(0, 4), now.slice(4, 10)].join('-')
  }
}
