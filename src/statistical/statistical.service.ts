import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/cart/repository/order.repository';
import { QueryStatisticalAll } from './dto/queryStatiscalAll.dto';
import { AccountRepository } from 'src/account/repository/account.repository';
import { NewsRepository } from 'src/news/repository/news.repository';

@Injectable()
export class StatisticalService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly orderRepository: OrderRepository,
    private readonly AccRepo: AccountRepository,
    private readonly newsRepository: NewsRepository,
  ) {}

  async getStatisticalAll(query: QueryStatisticalAll) {
    const { date } = query;
    const newDate = date ? new Date(date) : new Date();
    const revenue = await this.orderRepository.revenue(newDate);
    const chartRevenue = await this.orderRepository.chartRevenue();
    const countOrders = await this.orderRepository.countDocuments({});
    const countAccounts = await this.AccRepo.countDocuments({});
    const countNews = await this.newsRepository.countDocuments({});

    return {
      countOrders,
      ...revenue,
      chartRevenue,
      countAccounts,
      countNews,
    };
  }
}
