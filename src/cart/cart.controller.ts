import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { OrderCartDto } from './dto/orderCart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/order')
  async orderCart(@Body() data: OrderCartDto) {
    return await this.cartService.orderCart(data);
  }
}
