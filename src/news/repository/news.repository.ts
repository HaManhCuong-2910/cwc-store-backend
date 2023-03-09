import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import { BaseRepository } from 'src/base/base.repository';
import { formatNumberMoney } from 'src/common/common';
import { TOrderItem } from 'src/post/dto/deafaut.dto';
import { Post } from 'src/post/models/post.model';
import { PostRepository } from 'src/post/repository/post.repository';
import { News } from '../models/news.model';

@Injectable()
export class NewsRepository extends BaseRepository<News> {
  constructor(
    @InjectModel('News')
    private readonly newModel: Model<News>,
  ) {
    super(newModel);
  }

  async countDocuments(filter) {
    return this.newModel.countDocuments(filter);
  }
}
