import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userResponse?: UserResponse;
  userProfileForm: FormGroup;
  userProfile:any;
  token: any;
  regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  imageUrl: any =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.userProfileForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.minLength(6), Validators.pattern(this.regexPhoneNumber)]],
      password: ['', Validators.minLength(3)],
      retype_password: ['', Validators.minLength(3)],
      date_of_birth: ['', [Validators.required, this.ageValidator(14)]] 
    }, {
      validators: this.passwordMatchValidator()
    });
  }

  ngOnInit(): void {
   
    this.token = this.tokenService.getToken() ?? '';
    this.userService.getUserDetail(this.token).subscribe({
      next: (response: any) => {
        this.userResponse = {
          ...response,
          date_of_birth: new Date(response.date_of_birth)
        };
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          address: this.userResponse?.address ?? '',
          date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0, 10),
        });
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
        this.userProfile = this.userService.getUserResponseFromLocalStorage()
      },
      complete() { },
      error(err) {
        console.log(err.error.message);
      },
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (fb: AbstractControl): ValidationErrors | null => {
      const password = fb.get('password')?.value;
      const retype_password = fb.get('retype_password')?.value;
      if (password !== retype_password) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  save(): void {
    console.log('Form Valid:', this.userProfileForm.valid);
    console.log('Form Controls:', this.userProfileForm.controls);
    Object.keys(this.userProfileForm.controls).forEach(key => {
      const control = this.userProfileForm.get(key);
      console.log(`${key}: `, control?.value, 'Valid:', control?.valid, 'Errors:', control?.errors);
    });
  
    if (this.userProfileForm.valid) {
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        password: this.userProfileForm.get('password')?.value,
        retype_password: this.userProfileForm.get('retype_password')?.value,
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value
      };
  
      this.userService.updateUserDetail(this.token, updateUserDTO).subscribe({
        next: (respond: any) => {
          this.userService.removeUserFromLocalStorage();
          this.tokenService.removeToken();
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          alert(error.error.message);
        }
      });
    } else {
      if (this.userProfileForm.hasError('passwordMismatch')) {
        alert("Mật khẩu mới không khớp với mật khẩu nhập lại");
      }
    }
  }
  
  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const today = new Date();
      const birthDate = new Date(control.value);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < minAge) {
        return { invalidAge: { value: control.value } };
      }

      return null;
    };
  }
}

