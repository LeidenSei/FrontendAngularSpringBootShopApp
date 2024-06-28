import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("oke");
    console.log(this.tokenService.isTokenExpired(), this.tokenService.getUserId());
    
    if (!this.tokenService.isTokenExpired() && this.tokenService.getUserId() > 0) {
      return true; // Allow access if token is valid and user ID is greater than 0
    } else {
      // Redirect to login if token is expired or user ID is not valid
      console.log('Redirecting to login...');
      this.router.navigate(['login']);
      return false;
    }
  }
}
