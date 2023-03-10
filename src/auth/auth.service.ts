import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
var md5 = require('md5');
import { AuthRepository } from './repository/auth.repository';
import { Request } from 'express';
import { Cache } from 'cache-manager';
import { filterAccount, saltOrRounds } from 'src/common/common';
import { AuthCreateDto } from './dto/authCreate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(payload: UserLoginDto) {
    const { email, password } = UserLoginDto.plainToClass(payload);
    const resultLogin = await this.authRepository.validateUser(email, password);
    if (resultLogin) {
      const access_token = this.authRepository.generate_access_token(
        filterAccount(resultLogin),
      );
      const refresh_token = this.authRepository.generate_refresh_token(
        filterAccount(resultLogin),
      );
      await this.cacheManager.set(
        `refresh_token_${resultLogin._id}`,
        refresh_token,
        { ttl: 172800 }, //2day
      );
      return {
        status: HttpStatus.ACCEPTED,
        access_token,
        user: resultLogin,
      };
    }
    throw new UnauthorizedException();
  }

  async refresh_access_token(request: Request) {
    try {
      const access_token: string = request.headers.authorization
        .toString()
        .split(' ')[1];
      return await this.authRepository.refresh_access_token(access_token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async register(payload: AuthCreateDto) {
    const dataUser = AuthCreateDto.plainToClass(payload);
    const { password, email, ...infoUser } = dataUser;
    const validateExistAccount = await this.authRepository.findByCondition({
      email,
    });

    if (validateExistAccount) {
      throw new HttpException('Đã tồn tại email', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    return await this.authRepository
      .create({ ...infoUser, password: hashPassword })
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

  async logout(request: Request) {
    try {
      const access_token: string = request.headers.authorization
        .toString()
        .split(' ')[1];
      return await this.authRepository.remove_refresh_token(access_token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
