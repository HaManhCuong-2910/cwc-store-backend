import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreatePostDto,
  QuerySearchPostDto,
  UpdatePostDto,
} from './dto/CreatePost.dto';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  async getAllPost(query: QuerySearchPostDto) {
    const {
      page = 1,
      limit = 10,
      name,
      to_price,
      from_price,
      from_size,
      to_size,
      ...filter
    } = query;
    const skip = Number(limit) * Number(page) - Number(limit);
    let queryPrice = {},
      querySize = {},
      queryName = {};

    if (name) {
      queryName = { name: { $regex: '.*' + name + '.*', $options: 'i' } };
    }

    if (from_price && to_price) {
      queryPrice = {
        $or: [
          { price: { $gte: from_price, $lte: to_price } },
          { sales: { $gte: from_price, $lte: to_price } },
        ],
      };
    }

    if (from_size && to_size) {
      querySize = {
        $and: [
          { 'quantities.size': { $gte: from_size, $lte: to_size } },
          { 'quantities.quantity': { $gt: 0 } },
        ],
      };
    }

    console.log('[queryPrice, queryName, querySize, filter]', [
      queryPrice,
      queryName,
      querySize,
      filter,
    ]);

    const result = await this.postRepo.getByCondition(
      {
        $or: [queryPrice, queryName, querySize, filter],
      },
      undefined,
      { skip, limit, sort: { updatedAt: 1 } },
      'category',
    );
    const countRecord = await this.postRepo.countDocuments({
      ...queryPrice,
      ...querySize,
      ...filter,
    });

    const maxPrices = await this.postRepo.findMaxPrice();
    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
      maxPrices,
    };
  }

  async GetPost(query: UpdatePostDto) {
    return await this.postRepo.findByCondition(
      query,
      undefined,
      undefined,
      'category',
    );
  }

  async DeletePost(id: string) {
    return await this.postRepo.deleteOne(id);
  }

  async createPost(dataPosts: CreatePostDto) {
    let result = await this.postRepo.create(dataPosts);

    return result;
  }

  async updatePost(id: string, dataPosts: UpdatePostDto) {
    let result = await this.postRepo.findByIdAndUpdate(id, dataPosts);

    return result;
  }
}
