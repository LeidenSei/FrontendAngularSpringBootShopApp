import { HttpUtilService } from './http.ulti.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { OrderDto } from '../dtos/user/order.dto';
import { OrderResponse } from '../responses/user/order.response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) { }

  order(orderDTO: OrderDto): Observable<any> {
    return this.http.post(this.apiUrl, orderDTO);
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get(this.apiUrl + "/" + orderId)
  }

  getAllOrders(keyword: string, page: number, limit: number): Observable<OrderResponse[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page)
      .set('limit', limit)
    return this.http.get<any>(this.apiUrl + "/get-orders-by-keyword", { params })
  }
  updateOrder(orderId:number,orderData:any):Observable<any>{
    return this.http.put(this.apiUrl+"/"+orderId,orderData);
  }
  deleteOrder(orderId:number):Observable<any>{
    return this.http.delete(this.apiUrl+"/"+orderId);
  }
}
