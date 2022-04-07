import { BatchesService } from './../../../services/batches/batches.service';
import { BranchesService } from './../../../services/branches/branches.service';
import { Branch } from './../../../models/branch.model';
import { AuthService } from './../../../services/auth/auth.service';
import { User } from './../../../models/user.model';
import { catchError, of } from 'rxjs';
import { UsersService } from './../../../services/users/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {

  public messengers: User[] = [];
  public branches: Branch[] = [];
  public userBranch!: Branch;

  public branch_to!: any;
  public messenger!: any;
  public orders!: string;

  public error:string = '';

  constructor(private usersService: UsersService,
    private authService: AuthService,
    private branchService: BranchesService,
    private batchService: BatchesService
  ) { }

  ngOnInit(): void {
    this.userBranch = this.authService.getLoggedUserDetails().branch
    this.fetchMessangers()
    this.fetchBranches()

  }

  fetchMessangers() {
    this.usersService.fetch_all_users(3).pipe(catchError(error => {
      console.log(error);

      return of({})
    }))
      .subscribe(users => {
        if (Array.isArray(users)) {
          this.messengers = users
        }
      })
  }

  fetchBranches() {
    this.branchService.fetch_all_branches(this.userBranch.id).pipe(catchError((error) => {
      return of([])
    }))
      .subscribe(branches => {
        if (Array.isArray(branches)) {
          this.branches = branches
        }
      })
  }

  submitBatch() {
    this.error = ''
    if (this.branch_to && this.messenger && this.orders) {
      const orderArray = this.orders.split(',')
      this.batchService.createBatch(+this.branch_to, +this.messenger, orderArray)
        .pipe(catchError(error => {
          this.error = error

          return of({})
        }))
        .subscribe(batch => {
          console.log(batch);
          
        })
    } else {
      this.error = "Please fill in all the fields"
    }
  }

}
