import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class AuthCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  @Expose()
  phoneNumber: string;

  @IsString()
  @Expose()
  age: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}
