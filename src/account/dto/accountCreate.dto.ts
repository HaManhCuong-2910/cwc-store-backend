import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { EStatusAccount, IsOptional } from 'src/common/common';

export class AccountCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  phoneNumber: string;

  @IsString()
  age: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EStatusAccount)
  status: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsArray()
  roles: string[];

  @IsNotEmpty()
  @IsString()
  type: string;
}
