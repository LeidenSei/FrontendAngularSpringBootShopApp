import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  totalAmount: number = 0;
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService,
  ){

  }
  ngOnInit(): void {
    this.getProductCart();
  }
  getProductCart(){
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    this.productService.getProductByIds(productIds).subscribe({
      next: (products) => {
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
      complete: () => {
        console.log("Product data loaded successfully.");
        this.calculateTotal();
      },
      error: (error: any) => {
        console.log("Error loading product data:", error);
      }
    });
  }
  loadCart() {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    if (productIds.length === 0) {
      this.cartItems = [];
      return;
    }
    this.getProductCart();
  }
  removeOneOrder(id:number){
    this.cartService.removeFromCart(id);
   
    if(this.cartService.getCart().size === 0){
      this.loadCart();
    } else{
      this.getProductCart();
    }
  }
  clearOrder(){
    this.cartService.clearCart();
    this.loadCart();
  }
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  }

  updateQuantity(productId: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let quantity = parseInt(inputElement.value, 10);
    
    if (!isNaN(quantity)) {
      this.cartService.updateCart(productId, quantity);
    }
  
    if (this.cartService.getCart().size === 0) {
      this.loadCart();
    } else {
      this.getProductCart();
    }
  }
  
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item.product.id, { target: { value: item.quantity.toString() } } as unknown as Event);
    }
  }
  
  increaseQuantity(item: any) {
    item.quantity++;
    this.updateQuantity(item.product.id, { target: { value: item.quantity.toString() } } as unknown as Event);
  }
  
}
