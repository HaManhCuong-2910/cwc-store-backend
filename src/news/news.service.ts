import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import {
  CreateNewsDto,
  DeleteNewsDto,
  OptionalNewsDto,
  UpdateNewsDto,
} from './dto/News.dto';
import { NewsRepository } from './repository/news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async getList(query: OptionalNewsDto) {
    const { page = 1, limit = 10, author, title } = query;

    const skip = Number(limit) * Number(page) - Number(limit);
    let queryAuthor = {},
      queryTitle = {};
    if (author) {
      queryAuthor = { author: { $regex: author, $options: 'i' } };
    }
    if (title) {
      queryTitle = { title: { $regex: title, $options: 'i' } };
    }
    const result = await this.newsRepository.getByCondition(
      {
        $and: [queryAuthor, queryTitle],
      },
      undefined,
      {
        skip,
        limit,
        sort: { updatedAt: -1 },
      },
    );
    const countRecord = await this.newsRepository.countDocuments({
      ...queryAuthor,
      ...queryTitle,
    });

    return {
      data: result,
      page: Number(page),
      countRecord: countRecord,
      count: Math.ceil(countRecord / limit),
    };
  }

  async getDetailNews(id: string) {
    try {
      const result = await this.newsRepository.findById(id);

      if (result) {
        return {
          status: HttpStatus.OK,
          data: result,
        };
      }

      throw new HttpException('không tìm thấy tin tức', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException('không tìm thấy tin tức', HttpStatus.NOT_FOUND);
    }
  }

  async createNews(data: CreateNewsDto) {
    const dtoNews = CreateNewsDto.plainToClass(data);

    const createDataResponse = await this.newsRepository
      .create(dtoNews)
      .then((newNews) => {
        return {
          status: HttpStatus.OK,
          data: newNews,
        };
      })
      .catch((error) => {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });

    return createDataResponse;
  }

  async updateNews(data: UpdateNewsDto) {
    const { _id, ...updateDtoData } = data;

    const updateDataResponse = await this.newsRepository
      .findByIdAndUpdate(_id, updateDtoData)
      .then((res) => {
        return {
          status: HttpStatus.OK,
          data: res,
        };
      })
      .catch((error) => {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });

    return updateDataResponse;
  }

  async deleteNews(param: DeleteNewsDto) {
    return await this.newsRepository
      .deleteOne(param.id)
      .then((res) => {
        return {
          status: HttpStatus.OK,
          data: res,
        };
      })
      .catch((error) => {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });
  }
}
