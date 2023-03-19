import { Schema } from 'mongoose';
import { EStatusAccount } from 'src/common/common';

const accountSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      default: '',
    },
    email: {
      type: String,
      require: true,
      default: '',
    },
    phoneNumber: {
      type: String,
      require: true,
      default: '',
    },
    password: {
      type: String,
      require: true,
      default: '',
    },
    avatar: {
      type: String,
      require: true,
      default: 'default.jpg',
    },
    public_id_avatar: {
      type: String,
      require: true,
      default: '',
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
    province_id: {
      type: Number,
      require: true,
      default: '',
    },
    district_id: {
      type: Number,
      require: true,
      default: '',
    },
    address: {
      type: String,
      require: true,
      default: '',
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
  public_id_avatar: string;
  phoneNumber: string;
  password: string;
  avatar: string;
  province_id: number;
  district_id: number;
  address: string;
  roles: string[];
  type: string;
}
