import { RoleGuard } from './../core/guards/role.guard';
import { Role } from './../models/role.model';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';

import { UsersComponent } from './components/users/users.component';
import { User } from '../models/user.model';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'batches',
        component: OrdersTableComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [
            Role.Manager,
          ]
        },
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
