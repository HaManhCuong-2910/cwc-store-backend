import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from 'src/account/account.service';
import { accountSchema } from 'src/account/model/account.model';
import { rolesSchema } from 'src/account/model/roles.model';
import { AccountRepository } from 'src/account/repository/account.repository';
import { RolesRepository } from 'src/account/repository/roles.repository';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { newSchema } from './models/news.model';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './repository/news.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'News',
        schema: newSchema,
      },
      {
        name: 'Account',
        schema: accountSchema,
      },
      {
        name: 'Roles',
        schema: rolesSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [
    NewsRepository,
    NewsService,
    JwtService,
    AccountService,
    AccountRepository,
    RolesRepository,
  ],
})
export class NewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/news/create', method: RequestMethod.POST },
        { path: '/news/edit', method: RequestMethod.PUT },
        { path: '/news/:id/delete', method: RequestMethod.DELETE },
      );
  }
}
