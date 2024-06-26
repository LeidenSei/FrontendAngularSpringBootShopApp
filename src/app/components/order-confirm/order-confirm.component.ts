import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { OrderResponse } from 'src/app/responses/user/order.response';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetail } from 'src/app/models/orderdetail';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  }
  

  constructor(private orderService: OrderService) { }


  ngOnInit(): void {
    this.getOrderDetails();
    console.log(this.orderResponse);
  }

  getOrderDetails(): void {
    const orderId = 9;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );
        this.orderResponse.order_details = response.order_details.map((order_details: OrderDetail) => {
          order_details.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_details.product.thumbnail}`
          return order_details
        })
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        )     
      },
      complete() {
        
      },
      error(err) {
        console.log(err);
      },
    })
  }

}
