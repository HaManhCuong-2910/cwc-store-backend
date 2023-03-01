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
import { createResponse } from './dto/create.dto';
import { ResponseService } from './response.service';

@ApiTags('response')
@Controller('response')
export class ResponseController {
  constructor(private readonly ResponseService: ResponseService) {}

  @Post('/create')
  async createResponse(@Body() data: createResponse) {
    return await this.ResponseService.createResponse(data);
  }
}
