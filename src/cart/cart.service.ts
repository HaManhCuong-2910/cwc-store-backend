import { HttpStatus, Injectable } from '@nestjs/common';
import { OrderCartDto } from './dto/orderCart.dto';
import { OrderRepository } from './repository/order.repository';

@Injectable()
export class CartService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async orderCart(data: OrderCartDto) {
    return await this.orderRepository.orderCart(data);
  }
}
