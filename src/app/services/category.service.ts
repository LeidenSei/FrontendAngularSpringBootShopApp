import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetCategory = `${environment.apiBaseUrl}/categories`
  constructor(private HttpClient:HttpClient) { }

  getCategory(page:any, limit:any):Observable<Category[]>{
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString())
    return this.HttpClient.get<Category[]>(this.apiGetCategory, { params })
  }
}
