import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { EStatusOrder } from 'src/common/common';
import {
  ChangStatusOrderDto,
  ChangStatusPaymentOrderDto,
  OrderCartDto,
} from './dto/orderCart.dto';
import { OrderListDto } from './dto/orderList.dto';
import { OrderRepository } from './repository/order.repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class CartService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async orderCart(data: OrderCartDto) {
    return await this.orderRepository.orderCart(data);
  }

  async getListOrder(query: OrderListDto) {
    const { page = 1, limit = 10, name, not_equal, status, ...filter } = query;

    const skip = Number(limit) * Number(page) - Number(limit);
    let queryName = {},
      queryStatus: any = status ? { status } : {};

    if (name) {
      queryName = { name: { $regex: '.*' + name + '.*', $options: 'i' } };
    }

    if (not_equal) {
      queryStatus = { status: { $ne: status } };
    }

    const result = await this.orderRepository.getByCondition(
      {
        $and: [queryName, queryStatus, filter],
      },
      undefined,
      { skip, limit, sort: { updatedAt: -1 } },
      'data.id',
    );
    const countRecord = await this.orderRepository.countDocuments({
      $and: [queryName, queryStatus, filter],
    });
    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
      countRecord,
    };
  }

  async changStatusOrder(data: ChangStatusOrderDto) {
    try {
      const { id, status } = data;
      const objectID = new ObjectId(id);
      await this.orderRepository.findByIdAndUpdate(objectID, {
        status,
      });

      return {
        status: HttpStatus.OK,
        message: 'Thành công',
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }

  async changStatusPaymentOrder(data: ChangStatusPaymentOrderDto) {
    try {
      const { id, status } = data;
      const objectID = new ObjectId(id);
      await this.orderRepository.findByIdAndUpdate(objectID, {
        status_payment: status,
      });

      return {
        status: HttpStatus.OK,
        message: 'Thành công',
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }

  async removeOrder(id: string) {
    try {
      await this.orderRepository.deleteOne(id);
      return {
        status: HttpStatus.OK,
        message: 'Thành công',
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }
}
