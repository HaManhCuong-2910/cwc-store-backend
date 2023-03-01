import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from 'src/post/models/post.model';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/repository/post.repository';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { orderSchema } from './models/order.model';
import { OrderRepository } from './repository/order.repository';

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
  providers: [CartService, PostRepository, OrderRepository],
})
export class CartModule {}
