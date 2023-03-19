import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { COrderCart } from 'src/category/dto/deafaut.dto';
import { EStatusOrder } from 'src/common/common';

export class OrderCartDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of user',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'The email of user',
  })
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  @ApiProperty({
    type: String,
    description: 'The phone number of user',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'The province',
  })
  province: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'The district',
  })
  district: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The address',
  })
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    isArray: true,
    type: COrderCart,
    description: 'The list order',
  })
  @Type(() => COrderCart)
  data: COrderCart[];
}

export class ChangStatusOrderDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  status: EStatusOrder;
}
