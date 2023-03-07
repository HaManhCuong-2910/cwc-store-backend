import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/account/model/account.model';
import {
  CACHE_MANAGER,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { filterAccount } from 'src/common/common';

export class AuthRepository extends BaseRepository<Account> {
  constructor(
    @InjectModel('Account')
    private readonly AccountModel: Model<Account>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(AccountModel);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findByCondition({ email });
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    throw new UnauthorizedException();
  }

  generate_refresh_token(user: any) {
    const refresh_token = this.jwtService.sign(user, {
      expiresIn: '1d',
    });

    return refresh_token;
  }

  generate_access_token(user: any) {
    const access_token = this.jwtService.sign(user);

    return access_token;
  }

  async refresh_access_token(access_token_old: string) {
    try {
      const user: any = this.jwtService.decode(access_token_old);
      const refresh_token = await this.cacheManager.get(
        `refresh_token_${user.id}`,
      );
      if (
        refresh_token &&
        this.jwtService.verify(refresh_token, {
          secret: process.env.JWT_SECRET,
        })
      ) {
        return {
          status: HttpStatus.ACCEPTED,
          access_token: this.generate_access_token(filterAccount(user)),
          user
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async remove_refresh_token(access_token: string) {
    try {
      const user: any = this.jwtService.decode(access_token);
      await this.cacheManager.del(`refresh_token_${user.id}`);
      return {
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
