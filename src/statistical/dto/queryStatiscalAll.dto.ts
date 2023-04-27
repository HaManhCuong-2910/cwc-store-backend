import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class QueryStatisticalAll extends BaseDto {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    description: 'date of count money orders',
  })
  date: string;
}
