import { AuthGuard } from '../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';

import { TripsPageComponent } from './components/trips-page/trips-page.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'orders',
        component: OrdersTableComponent
      },
      {
        path: 'trips',
        component: TripsPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
