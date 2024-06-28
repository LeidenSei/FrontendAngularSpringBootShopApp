import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';

@Component({
  selector: 'user-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.scss'],
})
export class UserProfileComponent {
  userResponse?: UserResponse;
  userProfileForm: FormGroup;
  token: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.userProfileForm = this.fb.group({
      fullname: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', Validators.minLength(6)],
      password: ['', Validators.minLength(3)],
      retype_password: ['', Validators.minLength(3)],
      date_of_birth: ['', Validators.required]
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
}
