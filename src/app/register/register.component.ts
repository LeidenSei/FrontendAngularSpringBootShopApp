import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm: NgForm | undefined;
  phone: String;
  password: String;
  retypePassword: String;
  fullName: String;
  address: String;
  isAccepted: boolean;
  dateOfBirth: Date;
  constructor(private http: HttpClient, private router: Router) {
    this.phone = ''
    this.password = ''
    this.retypePassword = ''
    this.fullName = ''
    this.address = '',
      this.isAccepted = false,
      this.dateOfBirth = new Date()
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18)
  }

  onPhoneChange() {
    console.log(`PHone typed: ${this.phone}`)
  }
  register() {
    const msg = `phone: ${this.phone}` + `password: ${this.password}`
      + `retypePassword: ${this.retypePassword}` + `fullName: ${this.fullName}`
      + `address: ${this.address}` + `isAccepted: ${this.isAccepted}` + `dateOfBirth: ${this.dateOfBirth}`
    // alert(msg)
    
    const apiUrl = "localhost:8088/api/v1/users/register"
    const registerData = {
      "fullname": this.fullName,
      "phone_number": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    console.log(registerData);
    
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
    this.http.post(apiUrl, registerData, { headers: headers })
      .subscribe({
        next: (response: any) => {
          if (response && (response.status === 200 || response.status === 201)) {
            this.router.navigate(['/login'])
          } else {

          }
        },
        complete() {

        },
        error(err: any) {
          console.error('dang ky khong thanh cong', err)
        },
      }

      );

  }
  checkPasswordsMatch() {
    if (this.password != this.retypePassword) {
      this.registerForm?.form.controls['retypePassword'].setErrors({ 'passwordMissmatch': true })
    } else {
      this.registerForm?.form.controls['retypePassword'].setErrors(null)
    }
  }
  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.registerForm?.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm?.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
