import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrdersAdminComponent } from './orders/orders.admin.component';
import { DetailOrderAdminComponent } from './detail-order-admin/detail-order-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrdersAdminComponent
      },
      {
        path: 'orders/:id',
        component: DetailOrderAdminComponent
      },
      {
        path: 'product',
        component: ProductAdminComponent
      },
      {
        path: 'category',
        component: CategoryAdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
