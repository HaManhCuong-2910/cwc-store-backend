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
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { join } from 'path';
import { roles } from 'src/common/common';
import { PermissionGuard } from 'src/guard/permission.guard';
import { AccountService } from './account.service';
import { AccountCreateDto } from './dto/accountCreate.dto';
import { GetListAccountDto } from './dto/getAccountDto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/:id/user')
  async getUser(@Param('id') id: string) {
    return await this.accountService.getAcc(id);
  }

  @Get('/get-list-roles')
  @UseGuards(PermissionGuard(roles.fullOptionRoles))
  async getListRoles() {
    return await this.accountService.getListRoles();
  }

  @Get('/get-list-account')
  @UseGuards(PermissionGuard(roles.getListAccount))
  async getListAccount(@Query() query: GetListAccountDto) {
    return await this.accountService.getListAccount(query);
  }

  @Post('/create')
  @UseGuards(PermissionGuard(roles.createAccount))
  async createAcc(@Body() account: AccountCreateDto) {
    return await this.accountService.createAcc(account);
  }

  @Post('/update')
  @UseGuards(PermissionGuard(roles.updateAccount))
  async updateAcc(@Body() data: any) {
    return await this.accountService.updateAcc(data);
  }
}
