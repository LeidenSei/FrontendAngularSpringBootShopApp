import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  private jwtHelperService = new JwtHelperService();

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUserId(): number {
    const token = this.getToken();
    if (!token) return 0;

    let userObj = this.jwtHelperService.decodeToken(token);
    return userObj && 'userId' in userObj ? parseInt(userObj['userId'], 10) : 0;
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true; 
    return this.jwtHelperService.isTokenExpired(token);
  }
}
