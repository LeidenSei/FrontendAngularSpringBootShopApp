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
  private apiConfig = {
    headers: this.createHeaders()
  }
  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-type': 'application/json' });
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiUrl + '/register', registerDTO, this.apiConfig)
  }

  login(loginDTO: LoginDto): Observable<any> {
    return this.http.post(this.apiUrl + '/login', loginDTO, this.apiConfig)
  }

}
