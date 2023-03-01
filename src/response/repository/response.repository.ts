import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Response } from '../models/response.model';

@Injectable()
export class ResponseRepository extends BaseRepository<Response> {
  constructor(
    @InjectModel('Response')
    private readonly responseModel: Model<Response>,
  ) {
    super(responseModel);
  }
}
