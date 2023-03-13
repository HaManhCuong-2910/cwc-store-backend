import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountCreateDto } from './dto/accountCreate.dto';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly AccRepo: AccountRepository) {}

  async createAcc(account: AccountCreateDto) {
    let acc = AccountCreateDto.plainToClass(account);

    await this.AccRepo.create(acc);
    return {
      statusCode: 200,
      message: 'Tao moi thanh cong',
    };
  }

  async updateAcc(data: any) {
    const { _id, ...updateDtoData } = data;

    const updateDataResponse = await this.AccRepo.findByIdAndUpdate(
      _id,
      updateDtoData,
    )
      .then((res) => {
        return {
          success: HttpStatus.OK,
          data: res,
        };
      })
      .catch((error) => {
        return {
          success: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });

    return updateDataResponse;
  }

  async getAcc(id: string) {
    return await this.AccRepo.findById(id);
  }
}
