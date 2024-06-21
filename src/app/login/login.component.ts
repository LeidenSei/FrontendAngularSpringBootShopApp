import { Component, ViewChild } from '@angular/core';
import { LoginDto } from '../dtos/user/login.dto';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined;
  phoneNumber: string = '';
  password: string = '';
  
  constructor(private router: Router,private userService:UserService) {
    
  }


  onPhoneChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }

  login(form: NgForm) {
    const msg = `phone: ${this.phoneNumber}` + `password: ${this.password}`
    alert(msg);
    const loginDTO:LoginDto = {
      phone_number: this.phoneNumber,
      password: this.password,
    };

    console.log(loginDTO);
    
    
    this.userService.login(loginDTO)
      .subscribe({
        next: (response: any) => {
          if (response ) {
            form.resetForm();
            // this.router.navigate(['/login'])
          } else {

          }
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
