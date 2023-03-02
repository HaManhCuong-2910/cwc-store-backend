import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { join } from 'path';
import { roles } from 'src/common/common';
import { PermissionGuard } from 'src/guard/permission.guard';
import {
  CreatePostDto,
  DeletePostDto,
  QuerySearchPostDto,
  UpdatePostDto,
} from './dto/CreatePost.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Get('/list')
  async getAllPost(@Query() query: QuerySearchPostDto) {
    return await this.PostService.getAllPost(query);
  }

  @Get('')
  async GetPost(@Query() query: UpdatePostDto) {
    return await this.PostService.GetPost(query);
  }

  @Post('/create')
  @UseGuards(PermissionGuard(roles.createPost))
  async createPost(@Body() dataPosts: CreatePostDto) {
    return await this.PostService.createPost(dataPosts);
  }

  @Put(':id')
  @UseGuards(PermissionGuard(roles.updatePost))
  async updatePost(@Param('id') id: string, @Body() dataPosts: UpdatePostDto) {
    return await this.PostService.updatePost(id, dataPosts);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(roles.deletePost))
  async deletePost(@Param() params: DeletePostDto) {
    return await this.PostService.DeletePost(params.id);
  }
}
