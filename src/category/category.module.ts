import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { jwtDefaultConfig } from 'src/config/jwt.config';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { categorySchema } from './models/category.model';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository';
import { AccountService } from 'src/account/account.service';
import { AccountRepository } from 'src/account/repository/account.repository';
import { accountSchema } from 'src/account/model/account.model';
import { JwtService } from '@nestjs/jwt';
import { RolesRepository } from 'src/account/repository/roles.repository';
import { rolesSchema } from 'src/account/model/roles.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: categorySchema,
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
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    AccountService,
    AccountRepository,
    RolesRepository,
    JwtService,
  ],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/category/list', method: RequestMethod.GET },
        { path: '/category', method: RequestMethod.GET },
      )
      .forRoutes(CategoryController);
  }
}
