import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class UserLoginDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsNotEmpty()
  @Expose()
  password: string;
}
