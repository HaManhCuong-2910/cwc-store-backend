import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCommon } from 'src/common/http.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token: string = req.headers.authorization
        .toString()
        .split(' ')[1];
      this.jwtService.verify(access_token, { secret: process.env.JWT_SECRET });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new HttpException('token expired', HttpStatusCommon.EXPIRED);
      } else {
        throw new UnauthorizedException();
      }
    }
    next();
  }
}
