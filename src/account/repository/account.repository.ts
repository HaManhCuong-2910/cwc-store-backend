import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Account } from '../model/account.model';
import * as fs from 'fs';
import { join } from 'path';

export class AccountRepository extends BaseRepository<Account> {
  constructor(
    @InjectModel('Account')
    private readonly AccountModel: Model<Account>,
  ) {
    super(AccountModel);
  }

  async countDocuments(filter) {
    return this.AccountModel.countDocuments(filter);
  }
}
