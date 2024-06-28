import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDto } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { UserResponse } from 'src/app/responses/user/user.response';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm | undefined;
  // phoneNumber: string = '';
  // password: string = '';
  roles: Role[] = [];
  selectedRole: Role | undefined;
  userResponse?: UserResponse;
  rememberMe: boolean = false;
  phoneNumber: string = '0123452534';
  password: string = '1234';
  constructor(private router: Router
    , private userService: UserService, private tokenService: TokenService
    , private roleService: RoleService) {

  }
  onPhoneNumberChange(){
    console.log(`Phone typed: ${this.phoneNumber}`);
    
  }
  ngOnInit() {
    this.roleService.getRoles().subscribe({
      next: (response: Role[]) => {
        this.roles = response;
        this.selectedRole = this.roles.length > 0 ? this.roles[0] : undefined;
      },
      complete() {

      },
      error(err: any) {
        console.error('error get role', err)
      },
    })
  }
  clickRememberMe(){
    return !this.rememberMe;
  }
  login() {
    const msg = `phone: ${this.phoneNumber}` + `password: ${this.password}`

    const loginDTO: LoginDto = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };

    // console.log(loginDTO);


    this.userService.login(loginDTO)
      .subscribe({
        next: (response: LoginResponse) => {
          const { token } = response
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (res: any) => {
              this.userResponse = {
                ...res,
                date_of_birth: new Date(res.date_of_birth)
              }
              if (this.rememberMe) {
                this.userService.saveUserResponseToLocalStorage(this.userResponse);
              }
             
              if (this.userResponse?.role.name == "admin") {
                this.router.navigate(['/admin'])
              }else  if (this.userResponse?.role.name == "user") {
                this.router.navigate(['/'])
              }
              
            },
            complete() {
                console.log("ok");
            },
            error(err) {
                console.log(err);
            },
          })

          
        },
        complete() {

        },
        error(err: any) {
          console.error('dang nhap khong thanh cong', err)
        },
      }

      );

  }
}
