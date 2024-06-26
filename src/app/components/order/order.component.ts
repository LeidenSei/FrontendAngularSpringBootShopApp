import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDto } from 'src/app/dtos/user/order.dto';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit  {
  orderForm: FormGroup;
  cartItems: { product: Product, quantity: number }[] = [];
  totalAmount: number = 0;
  couponCode: string = '';
  orderData: OrderDto = {
    user_id: 3,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: []
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      note: [''],
      shipping_method: ['express'],
      payment_method: ['cod']
    });
  }

  ngOnInit(): void {
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

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  }

  applyCoupon(): void {
    // Apply coupon logic here
  }

  placeOrder(): void {
    this.orderData = {
      ...this.orderData,
      ...this.orderForm.value,
    };
    this.orderData.cart_items = this.cartItems.map(cartItem => ({
      product_id: cartItem.product.id,
      quantity: cartItem.quantity
    }));
    this.orderData.total_money = this.totalAmount;

    this.orderService.order(this.orderData).subscribe({
      next: (response) => {
        console.log("Order placed successfully.");
      },
      complete: () => {
        this.calculateTotal();
      },
      error: (error: any) => {
        console.log("Error placing order:", error);
      }
    });
  }
}
