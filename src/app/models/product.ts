import { ProductImage } from "./product.image";

export interface Product{
  id:number;
  name:string;
  price: number;
  thumbnail:string;
  description:String;
  category_id:number;
  url:String;
  product_images:ProductImage[];
}