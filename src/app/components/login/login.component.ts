import { Component, ViewChild } from '@angular/core';
import { LoginDto } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined;
  phoneNumber: string = '';
  password: string = '';
  roles: Role[] = [];
  selectedRole : Role | undefined; 

  constructor(private router: Router, private userService: UserService,private tokenService: TokenService,private roleService:RoleService) {

  }

  ngOnInit(){
    this.roleService.getRoles().subscribe({
      next: (response: Role[]) => {

       this.roles=response;
       console.log(this.roles);
       
       this.selectedRole = this.roles.length > 0 ? this.roles[0] : undefined;
        
      },
      complete() {

      },
      error(err: any) {
        console.error('error get role', err)
      },
    })
  }

  login() {
    const msg = `phone: ${this.phoneNumber}` + `password: ${this.password}`

    const loginDTO: LoginDto = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ??1
    };

    // console.log(loginDTO);


    this.userService.login(loginDTO)
      .subscribe({
        next: (response: LoginResponse) => {
          const { token } = response
          console.log(token);
          this.tokenService.setToken(token);
          // this.router.navigate(['/login'])
          
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
