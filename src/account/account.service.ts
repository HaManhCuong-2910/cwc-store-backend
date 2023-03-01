import { Injectable } from '@nestjs/common';
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

  async getAcc(id: string) {
    return await this.AccRepo.findById(id);
  }
}
