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

    if (to_price > 0) {
      queryPrice = {
        $or: [
          { price: { $gte: from_price, $lte: to_price } },
          { sales: { $gte: from_price, $lte: to_price } },
        ],
      };
    }

    if (to_size > 0) {
      querySize = {
        $and: [
          { 'quantities.size': { $gte: from_size, $lte: to_size } },
          { 'quantities.quantity': { $gt: 0 } },
        ],
      };
    }
    const result = await this.postRepo.getByCondition(
      {
        $and: [queryPrice, queryName, querySize, filter],
      },
      undefined,
      { skip, limit, sort: { updatedAt: -1 } },
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
    await this.postRepo.deleteOne(id);
    return {
      status: HttpStatus.OK,
      message: 'Xóa thành công',
    };
  }

  async createPost(dataPosts: CreatePostDto) {
    let result = await this.postRepo.create(dataPosts);

    return {
      status: HttpStatus.OK,
      message: 'Tạo mới thành công',
      data: result,
    };
  }

  async updatePost(id: string, dataPosts: UpdatePostDto) {
    let result = await this.postRepo.findByIdAndUpdate(id, dataPosts);

    return {
      status: HttpStatus.OK,
      message: 'Sửa thành công',
      data: result,
    };
  }
}
