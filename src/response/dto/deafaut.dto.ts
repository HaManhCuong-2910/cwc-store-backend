import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
