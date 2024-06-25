import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/app/dtos/user/order.dto';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit  {
  cartItems: { product:Product, quantity:number} [] =[]
  totalAmount:number = 0;
  couponCode:string = '';
  orderData:OrderDto = {
    user_id:1,
    fullname: '',
    email:'',
    phone_number:'',
    address:'',
    note:'',
    total_money: 0,
    payment_method:'cod',
    shipping_method:'express',
    coupon_code:'',
    cart_items:[]
  }
  constructor(private ProductService:ProductService,private CartService:CartService){}


  ngOnInit(): void {
    const cart = this.CartService.getCart();
    const productIds = Array.from(cart.keys());
    this.ProductService.getProductByIds(productIds).subscribe({
      next:(products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
      },
      complete:() =>{
        console.log("loio cai j");
        this.calculateTotal()
      },
      error:(error :any) =>{
        console.log(error);
        
      }
    })
    
  }
  calculateTotal():void{
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
    
    
  };
  applyCoupon():void{
    
  }
}
