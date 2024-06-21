import {
  IsString,
  IsDate,
  IsNotEmpty,
  IsPhoneNumber
} from 'class-validator'
export class LoginDto {
  @IsPhoneNumber()
  phone_number: string;
  @IsString()
  @IsNotEmpty()
  password:string;
  constructor(data:any){
    this.phone_number=data.phone_number;
    this.password=data.password;
  }
}