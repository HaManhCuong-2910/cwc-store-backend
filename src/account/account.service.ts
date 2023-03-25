import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountCreateDto } from './dto/accountCreate.dto';
import { GetListAccountDto } from './dto/getAccountDto';
import { AccountRepository } from './repository/account.repository';
import { RolesRepository } from './repository/roles.repository';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/common/common';

@Injectable()
export class AccountService {
  constructor(
    private readonly AccRepo: AccountRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async createAcc(payload: AccountCreateDto) {
    const dataUser = AccountCreateDto.plainToClass(payload);
    const { password, email, ...infoUser } = dataUser;
    const validateExistAccount = await this.AccRepo.findByCondition({
      email,
    });

    if (validateExistAccount) {
      throw new HttpException('Đã tồn tại email', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    return await this.AccRepo.create({ ...infoUser, password: hashPassword })
      .then((newUser) => {
        return {
          success: HttpStatus.OK,
          data: newUser,
        };
      })
      .catch((error) => {
        return {
          success: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });
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

  async getListAccount(query: GetListAccountDto) {
    const { page = 1, limit = 10, name, status, ...filter } = query;

    const skip = Number(limit) * Number(page) - Number(limit);
    let queryName = {},
      queryStatus: any = status ? { status } : {};

    if (name) {
      queryName = { name: { $regex: '.*' + name + '.*', $options: 'i' } };
    }

    const result = await this.AccRepo.getByCondition(
      {
        $and: [queryName, queryStatus, filter],
      },
      undefined,
      { skip, limit, sort: { updatedAt: -1 } },
      undefined,
    );
    const countRecord = await this.AccRepo.countDocuments({
      $and: [queryName, queryStatus, filter],
    });
    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
      countRecord,
    };
  }

  async getListRoles() {
    try {
      const result = await this.rolesRepository.findAll();

      return {
        status: HttpStatus.OK,
        message: 'Thành công',
        data: result,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error,
      };
    }
  }

  async getAcc(id: string) {
    return await this.AccRepo.findById(id);
  }
}
