import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const mongoose = require('mongoose');
import { BaseRepository } from 'src/base/base.repository';
import { createCategoryDto } from '../dto/createCategory.dto';
import { GetOneCategoryDto } from '../dto/deafaut.dto';
import { Category } from '../models/category.model';
import { ObjectId } from 'mongodb';
import { HttpStatus } from '@nestjs/common/enums';

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

  async getCategories(isCategoryProduct: boolean, filter: any) {
    const { name, ...filterDataSearch } = filter;
    let categories,
      queryName = {};

    if (name) {
      queryName = { name: { $regex: name, $options: 'i' } };
    }

    if (isCategoryProduct) {
      categories = await this.getByCondition({
        isCategoryProduct,
        ...queryName,
        ...filterDataSearch,
      });
    } else {
      categories = await this.categoryModel.aggregate([
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
    }

    return categories;
  }

  async updateAndNewCategory(data: createCategoryDto) {
    const { id, ...updateData } = data;
    try {
      const _id = id ? new ObjectId(id) : new mongoose.Types.ObjectId();

      const result = await this.categoryModel.findOneAndUpdate(
        { _id },
        { _id, ...updateData },
        { new: true, upsert: true },
      );

      return {
        status: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      console.log('error', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: error,
      };
    }
  }
}
