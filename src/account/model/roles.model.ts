import { Schema } from 'mongoose';
import { EStatusAccount } from 'src/common/common';

const rolesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      default: '',
    },
    value: {
      type: String,
      require: true,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'roles',
    versionKey: false,
  },
);

export { rolesSchema };

export interface Roles extends Document {
  name: string;
  value: string;
}
