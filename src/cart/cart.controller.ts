import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { ChangStatusOrderDto, OrderCartDto } from './dto/orderCart.dto';
import { OrderListDto } from './dto/orderList.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/list-order')
  async ListOrder(@Query() query: OrderListDto) {
    return await this.cartService.getListOrder(query);
  }

  @Post('/order')
  async orderCart(@Body() data: OrderCartDto) {
    return await this.cartService.orderCart(data);
  }

  @Put('/change-status-order')
  async changStatusOrder(@Body() data: ChangStatusOrderDto) {
    return await this.cartService.changStatusOrder(data);
  }

  @Delete('/:id/remove-order')
  async removeOrder(@Param('id') id: string) {
    return await this.cartService.removeOrder(id);
  }
}
