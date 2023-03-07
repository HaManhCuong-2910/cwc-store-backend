import { HttpStatus, Injectable } from '@nestjs/common';
import { NewsRepository } from './repository/news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async getList(query: any) {
    return 'any';
  }
}
