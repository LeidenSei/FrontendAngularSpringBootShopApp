
import { TokenService } from 'src/app/services/token.service';
import { inject, Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard{
    userResponse?:UserResponse|null
    constructor(
        private TokenService:TokenService, 
        private router:Router,
        private userService:UserService
    ){

    }
    canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        const isTokenExpired = this.TokenService.isTokenExpired();
        const isUserIdValid = this.TokenService.getUserId()>0;
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        const isAdmin = this.userResponse?.role.name == 'admin';
        if(!isTokenExpired && isUserIdValid && isAdmin){
            return true;
        } else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AdminGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean =>
{
    return inject(AdminGuard).canActive(next, state);
}