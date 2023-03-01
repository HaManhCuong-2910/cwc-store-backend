import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/CreatePost.dto';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  async getAllPost(query: UpdatePostDto) {
    const { page = 1, limit = 10, ...filter } = query;
    const skip = Number(limit) * Number(page) - Number(limit);
    const result = await this.postRepo.getByCondition(
      filter,
      undefined,
      { skip: skip, limit: limit },
      'category',
    );
    const countRecord = await this.postRepo.countDocuments(filter);
    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
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
