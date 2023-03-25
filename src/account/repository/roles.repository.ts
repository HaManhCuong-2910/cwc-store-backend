import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import * as fs from 'fs';
import { join } from 'path';
import { Roles } from '../model/roles.model';

export class RolesRepository extends BaseRepository<Roles> {
  constructor(
    @InjectModel('Roles')
    private readonly RolesModel: Model<Roles>,
  ) {
    super(RolesModel);
  }
}
