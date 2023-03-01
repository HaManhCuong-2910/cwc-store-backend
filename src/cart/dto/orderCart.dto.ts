import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { COrderCart } from 'src/category/dto/deafaut.dto';

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
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The province',
  })
  province: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The district',
  })
  district: string;

  @IsNotEmpty()
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
