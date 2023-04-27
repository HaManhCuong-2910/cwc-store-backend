import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { StatisticalService } from './statistical.service';
import { QueryStatisticalAll } from './dto/queryStatiscalAll.dto';

@ApiTags('statistical')
@Controller('statistical')
export class StatisticalController {
  constructor(private readonly statisticalService: StatisticalService) {}

  @Get('/count/all')
  async statisticalAll(@Query() query: QueryStatisticalAll) {
    return await this.statisticalService.getStatisticalAll(query);
  }
}
