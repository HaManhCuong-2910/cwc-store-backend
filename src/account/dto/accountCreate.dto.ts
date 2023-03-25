import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { EStatusAccount } from 'src/common/common';

export class AccountCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Tên chủ tài khoản',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Email',
  })
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Số điện thoại',
  })
  @Expose()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Password',
  })
  @Expose()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EStatusAccount)
  @ApiProperty({
    enum: EStatusAccount,
    description: 'Trạng thái tài khoản',
  })
  @Expose()
  status: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Avatar tài khoản',
  })
  @Expose()
  avatar: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Avatar id tài khoản',
  })
  @Expose()
  public_id_avatar: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
    description: 'Các quyền của tài khoản',
  })
  @Expose()
  roles: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Địa chỉ của tài khoản',
  })
  @Expose()
  address: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Loại tài khoản',
  })
  @Expose()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id Tỉnh/Thành phố',
  })
  @Expose()
  province_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id Quận/Huyện',
  })
  @Expose()
  district_id: number;
}
