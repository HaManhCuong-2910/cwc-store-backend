import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { IsOptional } from 'src/common/common';

export class createResponse extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the people response',
  })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The phoneNumber of the people response',
  })
  public phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'The email of the people response',
  })
  public email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The address of the people response',
  })
  public address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The description of the people response',
  })
  public description: string;
}
