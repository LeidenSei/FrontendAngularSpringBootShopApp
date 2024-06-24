import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiGetProducts = `${environment.apiBaseUrl}/products`
  constructor(private HttpClient:HttpClient) { }

  getProducts(keyword:any,categoryId:any,page:any, limit:any):Observable<Product[]>{
    const params = new HttpParams()
    .set('keyword',keyword.toString())
    .set('category_id',categoryId.toString())
    .set('page', page.toString())
    .set('limit', limit.toString())
    return this.HttpClient.get<Product[]>(this.apiGetProducts, { params })
  }
  getDetailProduct(productId:number){
    return this.HttpClient.get(`${this.apiGetProducts}/${productId}`)
  }
}
