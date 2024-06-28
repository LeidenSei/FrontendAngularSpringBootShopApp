import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DetailOrderAdminComponent } from './detail-order-admin/detail-order-admin.component';
import { AdminComponent } from './admin.component';
import { OrdersAdminComponent } from './orders/orders.admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailOrderAdminComponent,
    AdminComponent,
    OrdersAdminComponent,
    ProductAdminComponent,
    CategoryAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
