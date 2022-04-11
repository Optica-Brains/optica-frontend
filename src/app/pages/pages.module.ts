import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { ErrorsInterceptor } from './../core/interceptors/errors.interceptor';
import { TokenInterceptor } from './../core/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBatchComponent } from './components/create-batch/create-batch.component';
import { UserRoleDirective } from './directives/user-role.directive';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmDeliveryComponent } from './components/confirm-delivery/confirm-delivery.component';

@NgModule({
  declarations: [
    CreateBatchComponent,
    UserRoleDirective,
    DashboardComponent,
    OrdersTableComponent,
    ConfirmDeliveryComponent,
    ConfirmDeliveryComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ],
  exports: [
    CreateBatchComponent,
    UserRoleDirective,
    ConfirmDeliveryComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ]
})
export class PagesModule { }
