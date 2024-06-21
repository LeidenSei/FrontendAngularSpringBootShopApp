import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.apiBaseUrl}/roles`;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl)
  }

}
