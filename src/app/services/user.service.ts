import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { environment } from '../environment/environment';
import { HttpUtilService } from './http.ulti.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/users`;
  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor(private http: HttpClient,private httpUtilService:HttpUtilService) { }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiUrl + '/register', registerDTO, this.apiConfig)
  }

  login(loginDTO: LoginDto): Observable<any> {
    return this.http.post(this.apiUrl + '/login', loginDTO, this.apiConfig)
  }

}
