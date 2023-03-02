import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { IsOptional } from 'src/common/common';
import { CQuantity, TQuantity } from './deafaut.dto';

export class CreatePostDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The name shoes of a post',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The slug shoes of a post',
  })
  slug: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The description of a post',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The price of a post',
  })
  price: number;

  @IsNumber()
  @Expose()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The sales of a post',
  })
  sales: number;

  @IsNumber()
  @Expose()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The sales_percent of a post',
  })
  sales_percent: number;

  @IsBoolean()
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'The is_hot of a post',
  })
  is_hot: boolean;

  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    isArray: true,
    type: CQuantity,
    description: 'The quantities of a post',
  })
  @ValidateNested({ each: true })
  @Type(() => CQuantity)
  quantities: CQuantity[];

  @IsNotEmpty()
  @IsArray()
  @Expose()
  @ApiProperty({
    isArray: true,
    type: String,
    description: 'The images of a post',
  })
  images: string;
}

export class UpdatePostDto extends BaseDto {
  @IsOptional()
  @ApiProperty({
    type: String || Number,
    description: 'The page shoes of list post',
  })
  page: number;
  @IsOptional()
  @ApiProperty({
    type: String || Number,
    description: 'The limit shoes of list post',
  })
  limit: number;
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The name shoes of a post',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The slug shoes of a post',
  })
  slug: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The description of a post',
  })
  description: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The price of a post',
  })
  price: number;

  @IsNumber()
  @Expose()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The sales of a post',
  })
  sales: number;

  @IsNumber()
  @Expose()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The sales_percent of a post',
  })
  sales_percent: number;

  @IsBoolean()
  @Expose()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'The is_hot of a post',
  })
  is_hot: boolean;

  @IsOptional()
  @Expose()
  @ApiProperty({
    isArray: true,
    type: CQuantity,
    description: 'The quantities of a post',
  })
  @ValidateNested({ each: true })
  @Type(() => CQuantity)
  quantities: CQuantity[];

  @IsOptional()
  @IsArray()
  @Expose()
  @ApiProperty({
    isArray: true,
    type: String,
    description: 'The images of a post',
  })
  images: string;
}

export class QuerySearchPostDto extends BaseDto {
  @IsOptional()
  @ApiProperty({
    type: String || Number,
    description: 'The page shoes of list post',
  })
  page: number;
  @IsOptional()
  @ApiProperty({
    type: String || Number,
    description: 'The limit shoes of list post',
  })
  limit: number;
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The name shoes of a post',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The slug shoes of a post',
  })
  slug: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The description of a post',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The from_price of a post',
  })
  from_price: number;

  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The to_price of a post',
  })
  to_price: number;

  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The from_size of a post',
  })
  from_size: number;

  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'The to_size of a post',
  })
  to_size: number;

  @IsBoolean()
  @Expose()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'The is_hot of a post',
  })
  is_hot: boolean;
}

export class DeletePostDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'ID of the post',
  })
  id: string;
}
