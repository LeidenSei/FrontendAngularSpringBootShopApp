import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { TokenService } from 'src/app/services/token.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { ValidationError } from 'class-validator';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';

@Component({
  selector: 'user-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.scss'],
})
export class UserProfileComponent {
  userResponse?: UserResponse;
  userProfileForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.userProfileForm = this.fb.group({
      fullname: [''],
      address: ['', Validators.minLength(3)],
      phone_number: ['', Validators.minLength(6)],
      password: ['', Validators.minLength(3)],
      retype_password: ['', Validators.minLength(3)],
      date_of_birth: ['']
    })
  }
  ngOnInit(): void {
    let token: string =this.tokenService.getToken() ?? '';
    this.userService.getUserDetail(token).subscribe({
      next:(response: any) => {
        this.userResponse = {
          ...response,
          date_of_birth: new Date(response.date_of_birth)
        }
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          address:this.userResponse?.address,
          date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0,10),

        })
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
      },
      complete() {
          
      },
      error(err) {
          console.log(err.error.message);
          
      },
    })
  }

  passwordMatchValidator():ValidatorFn{
    return (fb:AbstractControl): ValidationError | null =>{
      const password = fb.get('password')?.value;
      const retype_password = fb.get('retype_password')?.value;
      if( password !== retype_password){
        return {  passwordMismatch: true};
      }
      return null;
    }
  }
  save():void{
    if (this.userProfileForm.valid){
      const updateUserDTO:UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        password:this.userProfileForm.get('password')?.value,
        retype_password:this.userProfileForm.get('retype_password')?.value,
        date_of_birth:this.userProfileForm.get('date_of_birth')?.value
      }
    }else{
      if (this.userProfileForm.hasError('passwordMismatch')){
        alert("mật khẩu mới không khớp với nhập lại mật khẩu")
      }
    }
  }
}