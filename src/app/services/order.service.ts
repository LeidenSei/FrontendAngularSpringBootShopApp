import { HttpUtilService } from './http.ulti.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { OrderDto } from '../dtos/user/order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) { }

  order(orderDTO:OrderDto): Observable<any> {
    return this.http.post(this.apiUrl, orderDTO);
  }

  getOrderById(orderId:number):Observable<any>{
    return this.http.get(this.apiUrl+"/"+orderId)
  }
}
