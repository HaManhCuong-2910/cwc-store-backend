import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { TOrderItem } from '../dto/deafaut.dto';
import { Post } from '../models/post.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {
    super(postModel);
  }

  async countDocuments(filter) {
    return this.postModel.countDocuments(filter);
  }

  async verifyQuantityShoes(item: TOrderItem) {
    const product: any = await this.postModel.findOne({
      $and: [
        { _id: new ObjectId(item.id) },
        { 'quantities._id': new ObjectId(item.size_id) },
      ],
    });
    if (!product) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Sản phẩm ${item.name} size ${item.size} không tồn tại`,
      };
    }
    const size_prod = await product.quantities.find(
      (size_prod: any) => size_prod._id.toString() === item.size_id,
    );

    if (item.quantity > size_prod.quantity) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Số lượng sản phẩm ${item.name} size ${item.size} không đủ`,
      };
    }
    return {
      status: HttpStatus.OK,
      price: product.price * item.quantity,
    };
  }

  async handleOrder(orders: TOrderItem[]) {
    for (let i = 0; i < orders.length; i++) {
      try {
        await this.postModel.updateOne(
          {
            $and: [
              { _id: new ObjectId(orders[i].id) },
              { 'quantities._id': new ObjectId(orders[i].size_id) },
            ],
          },
          { $inc: { 'quantities.$.quantity': -orders[i].quantity } },
        );
      } catch (error) {
        throw new HttpException(
          `Sản phẩm ${orders[i].name} size ${orders[i].size} xử lý không thành công`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}
