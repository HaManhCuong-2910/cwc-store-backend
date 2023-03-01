import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AuthService } from './auth.service';
import { AuthCreateDto } from './dto/authCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/refresh_access_token')
  async refresh_access_token(@Req() request: Request) {
    return await this.authService.refresh_access_token(request);
  }

  @Post('/login')
  async login(@Body() payload: UserLoginDto) {
    return await this.authService.login(payload);
  }

  @Post('/logout')
  async logout(@Req() request: Request) {
    return await this.authService.logout(request);
  }
}
