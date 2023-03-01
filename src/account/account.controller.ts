import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { join } from 'path';
import { roles } from 'src/common/common';
import { PermissionGuard } from 'src/guard/permission.guard';
import { AccountService } from './account.service';
import { AccountCreateDto } from './dto/accountCreate.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/:id/user')
  async getUser(@Param('id') id: string) {
    return await this.accountService.getAcc(id);
  }

  @Post('/create')
  @UseGuards(PermissionGuard(roles.createAccount))
  async createAcc(@Body() account: AccountCreateDto) {
    return await this.accountService.createAcc(account);
  }
}
