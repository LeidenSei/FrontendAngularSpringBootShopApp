import { CartService } from './../../services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  cartItems: { product:Product, quantity:number} [] =[]
  totalAmount:number = 0;
  couponCode:string = '';
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
