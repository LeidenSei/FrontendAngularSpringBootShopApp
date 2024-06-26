import { Product } from "./product";

export interface OrderDetail{
  id:number;
  numberOfProducts:number;
  price:number;
  product:Product;
  totalMoney:number;
}