import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './components/admin/admin.module';
import { OrderedDetailComponent } from './components/ordered-detail/ordered-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ListOrderedComponent } from './components/list-ordered/list-ordered.component';
// import { AdminComponent } from './components/admin/admin.component';

// import { OrdersAdminComponent } from './components/admin/orders/orders.admin.component';
// import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
// import { CategoryAdminComponent } from './components/admin/category-admin/category-admin.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    OrderConfirmComponent,
    LoginComponent,
    RegisterComponent,
    DetailProductComponent,
    AppComponent,
    OrderedDetailComponent,
    UserDetailComponent,
    OrdersComponent,
    ListOrderedComponent
    //admin
    // AdminComponent,
    // OrdersAdminComponent,
    // ProductAdminComponent,
    // CategoryAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AdminModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
    // HomeComponent,
    // OrderComponent,
    // OrderConfirmComponent,
    // LoginComponent
    // RegisterComponent
    // DetailProductComponent
  ]
})
export class AppModule { }
