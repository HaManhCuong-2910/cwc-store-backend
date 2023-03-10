import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountSchema } from './model/account.model';
import { AccountRepository } from './repository/account.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Account',
        schema: accountSchema,
      },
    ]),
    MulterModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, JwtService],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'account/:id/user', method: RequestMethod.GET });
  }
}
