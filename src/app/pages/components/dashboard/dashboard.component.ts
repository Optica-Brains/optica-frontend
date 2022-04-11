import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models/dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public summaries: Dashboard[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getSummary()
  }

  getSummary() {
    this.dashboardService.getDashboardSummary()
    .subscribe((response:any) => {
      this.summaries.push(response);
    })
  }

}
