import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { EStatusAccount } from 'src/common/common';

export class GetListAccountDto extends BaseDto {
  @IsOptional()
  @IsString()
  limit: number;

  @IsOptional()
  @IsString()
  page: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  province_id: number;

  @IsOptional()
  @IsString()
  district_id: number;

  @IsOptional()
  @IsString()
  status: EStatusAccount;
}
