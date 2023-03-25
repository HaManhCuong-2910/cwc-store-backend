import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createCategoryDto } from './dto/createCategory.dto';
import { GetOneCategoryDto } from './dto/deafaut.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async getCategories(query: any) {
    const { isCategoryProduct, ...filter } = query;
    return await this.categoryRepository.getCategories(
      isCategoryProduct,
      filter,
    );
  }

  async getOneCategory(query: GetOneCategoryDto) {
    return await this.categoryRepository.findByCondition(query);
  }

  async createCategory(data: createCategoryDto) {
    let result = await this.categoryRepository.updateAndNewCategory(data);

    return result;
  }

  async deleteCategory(id: string) {
    try {
      await this.categoryRepository.deleteOne(id);

      return {
        status: HttpStatus.OK,
        message: 'Thành công',
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }
}
