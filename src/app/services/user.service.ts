import { HttpUtilService } from './http.ulti.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { environment } from '../environment/environment';
import { UserResponse } from '../responses/user/user.response';

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
  getUserDetail(token: string): Observable<any> {
    return this.http.post(this.apiUrl + '/details', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    });
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      if(userResponse == null || !userResponse){
        return
      }
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);
      console.log('User response saveed to local storage');
    } catch (error) {
      console.error('Error saving user response to local storages', error)
    }
  }
  getUserResponseFromLocalStorage() {
    try {
      const userResponseJSON = localStorage.getItem('user');
      if(userResponseJSON == null || userResponseJSON == undefined){
        return null
      }
      const userResponse = JSON.parse(userResponseJSON);
      console.log('UserResponse retrieved from local storage');
      return userResponse
    } catch (err) {
      console.error('Err retrieving user response from local storage');
      return null;
    }
  }
}
