import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsOptional } from 'src/common/common';

export class COrderCart {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The id of the shoes',
  })
  public id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the shoes',
  })
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'The size of the size shoes',
  })
  public size: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The size_id of the size shoes',
  })
  public size_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'The quantity of the shoes',
  })
  public quantity: number;
}

export class GetOneCategoryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The id of the category',
  })
  _id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the category',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The slug of the category',
  })
  slug: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The parent of the category',
  })
  parent: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The createdAt of the category',
  })
  createdAt: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The updatedAt of the category',
  })
  updatedAt: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The isCategoryProduct of the category',
  })
  isCategoryProduct: string;
}
