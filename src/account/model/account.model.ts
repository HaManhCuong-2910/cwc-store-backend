import { Schema } from 'mongoose';
import { EStatusAccount } from 'src/common/common';

const accountSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
      default: 'default.jpg',
    },
    roles: {
      type: Array,
      require: true,
      default: [],
    },
    status: {
      type: String,
      require: true,
      default: EStatusAccount.ACTIVE,
    },
    type: {
      type: String,
      require: true,
      default: 'USER',
    },
  },
  {
    timestamps: true,
    collection: 'accounts',
  },
);

export { accountSchema };

export interface Account extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  age: number;
  password: string;
  avatar: string;
  roles: string[];
  type: string;
}
