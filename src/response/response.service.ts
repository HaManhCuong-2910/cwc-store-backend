import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { createResponse } from './dto/create.dto';
import { ResponseRepository } from './repository/response.repository';

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseRepository: ResponseRepository,
    private readonly mailerService: MailerService,
  ) {}

  async createResponse(data: createResponse) {
    let result = await this.responseRepository.create(data);
    await this.mailerService
      .sendMail({
        to: data.email,
        from: process.env.MAIL_SERVICE_USER,
        subject: `Phản hồi từ ${data.email}`,
        html: data.description,
      })
      .catch((err) => {
        throw new BadRequestException();
      });

    return {
      status: HttpStatus.OK,
      message: 'Gửi phản hồi thành công',
    };
  }
}
