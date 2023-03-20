import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { IsOptional } from 'src/common/common';

export class createCategoryDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The name category',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The slug category',
  })
  slug: string;

  @IsOptional()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'The parent category',
  })
  parent: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The isCategoryProduct of the category',
  })
  isCategoryProduct: string;
}
