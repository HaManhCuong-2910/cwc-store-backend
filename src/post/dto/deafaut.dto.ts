import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export type TQuantity = {
  size: number;
  quantity: number;
};

export type TOrderItem = {
  id: string;
  name: string;
  size: number;
  size_id: string;
  quantity: number;
};

export class CQuantity {
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The size of the shoes',
  })
  public size: number;

  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The quantity of the shoes',
  })
  public quantity: number;
}
