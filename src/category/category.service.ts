import { HttpStatus, Injectable } from '@nestjs/common';
import { createCategoryDto } from './dto/createCategory.dto';
import { GetOneCategoryDto } from './dto/deafaut.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async getCategories() {
    return await this.categoryRepository.getCategories();
  }

  async getOneCategory(query: GetOneCategoryDto) {
    return await this.categoryRepository.findByCondition(query);
  }

  async createCategory(data: createCategoryDto) {
    let result = await this.categoryRepository.create(data);

    return result;
  }
}
