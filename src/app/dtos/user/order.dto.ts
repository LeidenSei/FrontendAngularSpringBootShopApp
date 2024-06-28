import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail
} from 'class-validator'
export class OrderDto {
  @IsNotEmpty()
  user_id: number;
  @IsString()
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone_number: string;
  @IsString()
  address: string;
  @IsString()
  note: string;
  total_money: number;
  @IsString()
  payment_method: string;
  @IsString()
  shipping_method: string;
  @IsString()
  coupon_code: string;
  cart_items: { product_id: number, quantity: number }[];
  
  constructor(data: any) {
    this.user_id = data.user_id;
    this.fullname = data.fullname;
    this.email = data.email;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.note = data.note;
    this.total_money = data.total_money;
    this.payment_method = data.payment_method;
    this.shipping_method = data.shipping_method;
    this.coupon_code = data.coupon_code;
    this.cart_items = data.cart_items;
  }
};