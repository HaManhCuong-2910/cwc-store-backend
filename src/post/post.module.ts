import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AccountService } from 'src/account/account.service';
import { accountSchema } from 'src/account/model/account.model';
import { AccountRepository } from 'src/account/repository/account.repository';
import { jwtDefaultConfig } from 'src/config/jwt.config';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { postSchema } from './models/post.model';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: postSchema,
      },
      {
        name: 'Account',
        schema: accountSchema,
      },
    ]),
    MulterModule.register({
      dest: join(__dirname, '..', '..', 'public/images'),
    }),
    ...jwtDefaultConfig,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, AccountService, AccountRepository],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/post/create', method: RequestMethod.POST },
        { path: '/post/:id', method: RequestMethod.DELETE },
        { path: '/post/:id', method: RequestMethod.PUT },
      );
  }
}
