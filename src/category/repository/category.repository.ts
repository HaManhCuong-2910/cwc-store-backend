import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }

  async countDocuments(filter) {
    return this.categoryModel.countDocuments(filter);
  }

  async getCategories() {
    const categories = await this.categoryModel.aggregate([
      { $match: { parent: { $exists: false } } },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'parent',
          as: 'child',
        },
      },
    ]);
    return categories;
  }
}
