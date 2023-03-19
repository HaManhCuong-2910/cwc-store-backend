import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import { BaseRepository } from 'src/base/base.repository';
import { formatNumberMoney } from 'src/common/common';
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
    private readonly mailerService: MailerService,
  ) {
    super(orderModel);
  }

  async countDocuments(filter) {
    return this.orderModel.countDocuments(filter);
  }

  async orderCart(orderCart: OrderCartDto) {
    const orders = orderCart.data;
    let price: number = 0;
    for (let i = 0; i < orders.length; i++) {
      let verify_order = await this.postRepository.verifyQuantityShoes(
        orders[i],
      );
      if (verify_order.status === HttpStatus.OK) {
        orders[i]['price'] = verify_order.price;
        price += verify_order.price;
      } else {
        return verify_order;
      }
    }

    if (await this.postRepository.handleOrder(orders)) {
      await this.orderModel.create({ ...orderCart, price });
      let contentBuill = '';
      orders.forEach((item: TOrderItem) => {
        contentBuill += `<tr>
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.quantity}</td>
        <td>${formatNumberMoney(item['price'])}</td>
      </tr>`;
      });
      await this.mailerService
        .sendMail({
          to: orderCart.email,
          from: process.env.MAIL_SERVICE_USER,
          subject: `Đặt hàng thành công`,
          html: `
          <!DOCTYPE html>
          <html>
            <head>
            <style>
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }

            td, th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }

            tr:nth-child(even) {
              background-color: #dddddd;
            }
            </style>
            </head>
            <body>
              <p>Xin chào, <b>${orderCart.name}</b></p>
              <p>Cảm ơn bạn đã đặt hàng tại CWC STORE</p>
              <table>
              <thead style="border-collapse: collapse;width: 100%;">
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Kích cỡ</th>
                  <th>Số lượng</th>
                  <th>Giá tiền</th>
                </tr>
              </thead>
              <tbody>
              ${contentBuill}            
              </tbody>
            </table>
            <p><b>Tổng giá:</b> ${formatNumberMoney(price)}</p>
            </body>
          </html>
          `,
        })
        .catch((err) => {
          console.log('err', err);
          throw new BadRequestException();
        });
    }

    return {
      status: HttpStatus.OK,
      message: `Đặt hàng thành công`,
      order_bill: orders,
    };
  }
}
