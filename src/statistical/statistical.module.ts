import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticalController } from './statistical.controller';
import { StatisticalService } from './statistical.service';
import { orderSchema } from 'src/cart/models/order.model';
import { OrderRepository } from 'src/cart/repository/order.repository';
import { PostRepository } from 'src/post/repository/post.repository';
import { postSchema } from 'src/post/models/post.model';
import { AccountRepository } from 'src/account/repository/account.repository';
import { accountSchema } from 'src/account/model/account.model';
import { NewsRepository } from 'src/news/repository/news.repository';
import { newSchema } from 'src/news/models/news.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: orderSchema,
      },
      {
        name: 'Post',
        schema: postSchema,
      },
      {
        name: 'Account',
        schema: accountSchema,
      },
      {
        name: 'News',
        schema: newSchema,
      },
    ]),
  ],
  controllers: [StatisticalController],
  providers: [
    StatisticalService,
    OrderRepository,
    PostRepository,
    AccountRepository,
    NewsRepository,
  ],
})
export class StatisticalModule {}
