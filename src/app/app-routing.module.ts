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
import { UserProfileComponent } from './components/user-profile/user.profile.component';

const routes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'product/:id', component:DetailProductComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'order-detail/:id', component:OrderConfirmComponent},
  {path: 'user-profile',component:UserProfileComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
