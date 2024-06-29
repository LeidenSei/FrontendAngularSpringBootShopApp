import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuardFn } from './guards/admin.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ListOrderedComponent } from './components/list-ordered/list-ordered.component';
import { OrderedDetailComponent } from './components/ordered-detail/ordered-detail.component';


const routes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'product/:id', component:DetailProductComponent},
  {path: 'admin', component:AdminComponent, canActivate:[AdminGuardFn]},
  {path: 'orders', component: OrderComponent, canActivate:[AuthGuard]},
  {path: 'user-profile', component: UserDetailComponent, canActivate:[AuthGuard], children:[
    {path : '', component:ListOrderedComponent},
    {path : 'ordered-detail/:id', component:OrderedDetailComponent}
  ]},
  {path: 'order-detail/:id', component:OrderConfirmComponent},
  {path: 'cart', component:OrdersComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
