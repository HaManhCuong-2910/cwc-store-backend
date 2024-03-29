import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import { BaseRepository } from 'src/base/base.repository';
import { EStatusPaymentOrder, formatNumberMoney } from 'src/common/common';
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

  async revenue(date?: Date) {
    let dateSearch = {};
    let dateSearch_years = {};
    if (date) {
      dateSearch = {
        $and: [
          {
            createdAt: {
              $gte: new Date(`${date.getFullYear()}-${date.getMonth()}-${1}`),
            },
          },
          {
            createdAt: {
              $lt: new Date(
                `${date.getFullYear()}-${date.getMonth() + 1}-${1}`,
              ),
            },
          },
          {
            status_payment: EStatusPaymentOrder.PAYED,
          },
        ],
      };
      dateSearch_years = {
        $and: [
          {
            createdAt: {
              $gte: new Date(`${date.getFullYear()}-${1}-${1}`),
            },
          },
          {
            createdAt: {
              $lt: new Date(`${date.getFullYear() + 1}-${1}-${1}`),
            },
          },
          {
            status_payment: EStatusPaymentOrder.PAYED,
          },
        ],
      };
    }
    const dataRevenue_month = await this.orderModel.find(dateSearch);
    const dataRevenue_years = await this.orderModel.find(dateSearch_years);
    const revenue_month = dataRevenue_month.reduce((num: any, obj: any) => {
      return num + obj.price;
    }, 0);
    const revenue_years = dataRevenue_years.reduce((num: any, obj: any) => {
      return num + obj.price;
    }, 0);
    return {
      revenue_month,
      revenue_years,
    };
  }

  async chartRevenue() {
    const now = new Date();
    const listChartRevenue = [];
    for (let i = 1; i <= 12; i++) {
      const chartEveryMonth = await this.orderModel.find({
        $and: [
          {
            createdAt: {
              $gte: new Date(`${now.getFullYear()}-${i}-${1}`),
            },
          },
          {
            createdAt: {
              $lt:
                i === 12
                  ? new Date(`${now.getFullYear() + 1}-${1}-${1}`)
                  : new Date(`${now.getFullYear()}-${i + 1}-${1}`),
            },
          },
          {
            status_payment: EStatusPaymentOrder.PAYED,
          },
        ],
      });
      const revenue_month = chartEveryMonth.reduce((num: any, obj: any) => {
        return num + obj.price;
      }, 0);
      listChartRevenue.push({
        month: i,
        revenue_month,
      });
    }
    return listChartRevenue;
  }
}
