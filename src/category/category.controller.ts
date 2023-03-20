import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { createCategoryDto } from './dto/createCategory.dto';
import { CategoryService } from './category.service';
import { PermissionGuard } from 'src/guard/permission.guard';
import { roles } from 'src/common/common';
import { GetOneCategoryDto } from './dto/deafaut.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get('/')
  async getOneCategory(@Query() query: GetOneCategoryDto) {
    return await this.CategoryService.getOneCategory(query);
  }

  @Get('/list')
  async getCategories(@Query('isCategoryProduct') isCategoryProduct: boolean) {
    return await this.CategoryService.getCategories(isCategoryProduct);
  }

  @Post('/create')
  @UseGuards(PermissionGuard(roles.createCategory))
  async createCategory(@Body() data: createCategoryDto) {
    return await this.CategoryService.createCategory(data);
  }
}
