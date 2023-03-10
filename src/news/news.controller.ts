import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  Delete,
  Get,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { roles } from 'src/common/common';
import { PermissionGuard } from 'src/guard/permission.guard';
import {
  CreateNewsDto,
  DeleteNewsDto,
  OptionalNewsDto,
  UpdateNewsDto,
} from './dto/News.dto';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/list')
  async getList(@Query() query: any) {
    return this.newsService.getList(query);
  }

  @Get('/:id/detail')
  async getDetailNews(@Param('id') id: string) {
    return this.newsService.getDetailNews(id);
  }

  @Post('/create')
  @UseGuards(PermissionGuard(roles.createNews))
  async createNews(@Body() data: CreateNewsDto) {
    return this.newsService.createNews(data);
  }

  @Put('/edit')
  @UseGuards(PermissionGuard(roles.updateNews))
  async updateNews(@Body() data: UpdateNewsDto) {
    return this.newsService.updateNews(data);
  }

  @Delete('/:id/delete')
  @UseGuards(PermissionGuard(roles.deleteNews))
  async deleteNews(@Param() params: DeleteNewsDto) {
    return this.newsService.deleteNews(params);
  }
}
