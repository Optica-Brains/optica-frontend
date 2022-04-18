import { Status } from './../../../models/status.model';
import { Role } from './../../../models/role.model';
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
  Role = Role;
  Status = Status;
  public loading: boolean = false;
  public singleBatchLoading: boolean = true;
  public userBranch!: Branch;
  public batches!: Batch[];
  public batch!: Batch;
  public success: string = '';

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
    this.success = "Batch created!"
    setTimeout(() => {
      this.success = ''
    }, 1500);
  }

  fetchSingleBatch(id: number) {
    this.batchService.getSingleBatch(id)
    .subscribe((response:any) => {
      this.batch = response
      this.singleBatchLoading = false;
    })
  }

  riderDelivered(batchId:number){
    this.batchService.riderDeliver(batchId)
    .subscribe((response:any) => {
      this.fetchBatches()
      this.batch = response
    })
  }

}
