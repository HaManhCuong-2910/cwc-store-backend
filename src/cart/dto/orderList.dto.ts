import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { EStatusOrder } from 'src/common/common';

export class OrderListDto extends BaseDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  province: number;

  @IsOptional()
  @IsString()
  district: number;

  @IsOptional()
  @IsString()
  status: EStatusOrder;

  @IsOptional()
  @IsString()
  not_equal: boolean;
}
