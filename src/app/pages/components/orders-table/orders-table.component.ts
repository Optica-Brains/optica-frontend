import { Batch } from './../../../models/batch.model';
import { catchError, of } from 'rxjs';
import { AuthService } from './../../../services/auth/auth.service';
import { Branch } from './../../../models/branch.model';
import { BatchesService } from './../../../services/batches/batches.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {

  public loading: boolean = false;
  public userBranch!: Branch;
  public batches!: Batch[];

  batch_statuses : any = {
    delivered: {
      title: "Delivered",
      class: 'delivered-badge'
    },
    dispatched: {
      title: "Dispatched",
      class: 'dispatched-badge'
    }
  }

  constructor(private authService: AuthService, private batchService: BatchesService) { }

  ngOnInit(): void {
    this.userBranch = this.authService.getLoggedUserDetails().branch
    this.fetchBatches()
  }

  fetchBatches() {
    this.loading = true
    this.batchService.fetchBatches(this.userBranch.id).pipe(catchError((error) => {
      console.log(error);
      this.loading = false
      return of({})
    }))
      .subscribe(batches => {
        if (Array.isArray(batches)) {
          this.batches = batches
        }
        this.loading = false
      })
  }

  addBatch(batch:any){
    this.batches.unshift(batch)
  }

}
