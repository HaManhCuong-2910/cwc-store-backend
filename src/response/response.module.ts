import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { responseSchema } from './models/response.model';
import { ResponseRepository } from './repository/response.repository';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Response',
        schema: responseSchema,
      },
    ]),
  ],
  controllers: [ResponseController],
  providers: [ResponseService, ResponseRepository],
})
export class ResponseModule {}
