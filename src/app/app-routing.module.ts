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
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { AdminGuardFn } from './guards/admin.guard';
import { OrdersAdminComponent } from './components/admin/orders/orders.admin.component';


const routes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'product/:id', component:DetailProductComponent},
  {path: 'orders', component: OrderComponent, canActivate:[AuthGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate:[AuthGuard]},
  {path: 'order-detail/:id', component:OrderConfirmComponent},
  {path: 'admin', component:AdminComponent, canActivate:[AdminGuardFn]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
