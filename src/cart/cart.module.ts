import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { postSchema } from 'src/post/models/post.model';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/repository/post.repository';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { orderSchema } from './models/order.model';
import { OrderRepository } from './repository/order.repository';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: postSchema,
      },
      {
        name: 'Order',
        schema: orderSchema,
      },
    ]),
    PostModule,
  ],
  controllers: [CartController],
  providers: [CartService, PostRepository, OrderRepository, JwtService],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/cart/list-order', method: RequestMethod.GET },
        { path: '/cart/change-status-order', method: RequestMethod.PUT },
        { path: '/cart/:id/remove-order', method: RequestMethod.DELETE },
      );
  }
}
