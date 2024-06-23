import { HttpUtilService } from './http.ulti.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient, private httpUtilService: HttpUtilService) { }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiUrl + '/register', registerDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  login(loginDTO: LoginDto): Observable<any> {
    return this.http.post(this.apiUrl + '/login', loginDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
