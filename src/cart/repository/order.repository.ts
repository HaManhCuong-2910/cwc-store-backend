import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { TOrderItem } from 'src/post/dto/deafaut.dto';
import { Post } from 'src/post/models/post.model';
import { PostRepository } from 'src/post/repository/post.repository';
import { OrderCartDto } from '../dto/orderCart.dto';
import { Order } from '../models/order.model';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
    private readonly postRepository: PostRepository,
  ) {
    super(orderModel);
  }

  async orderCart(orderCart: OrderCartDto) {
    const orders = orderCart.data;
    let price: number = 0;
    for (let i = 0; i < orders.length; i++) {
      let verify_order = await this.postRepository.verifyQuantityShoes(
        orders[i],
      );
      if (verify_order.status === HttpStatus.OK) {
        price += verify_order.price;
      } else {
        return verify_order;
      }
    }

    if (await this.postRepository.handleOrder(orders)) {
      await this.orderModel.create({ ...orderCart, price });
    }

    return {
      status: HttpStatus.OK,
      message: `Đặt hàng thành công`,
    };
  }
}
