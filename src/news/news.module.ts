import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsRepository, NewsService],
})
export class NewsModule {}
