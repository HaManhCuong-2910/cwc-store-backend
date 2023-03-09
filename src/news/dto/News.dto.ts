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

export class CreateNewsDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The author of news',
  })
  author: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The img primary of news',
  })
  img: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The title of news',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The author of news',
  })
  short_description: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The author of news',
  })
  description: string;
}

export class OptionalNewsDto extends BaseDto {
  @IsOptional()
  @ApiProperty({
    type: String || Number,
    description: 'The page of list news',
  })
  page: number;
  @IsOptional()
  @ApiProperty({
    type: String || Number,
    description: 'The limit of list news',
  })
  limit: number;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The author of news',
  })
  author: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The img primary of news',
  })
  img: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The title of news',
  })
  title: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The author of news',
  })
  short_description: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The author of news',
  })
  description: string;
}

export class DeleteNewsDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'ID of news',
  })
  id: string;
}

export class UpdateNewsDto extends OptionalNewsDto {
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'ID of news',
  })
  _id: string;
}
