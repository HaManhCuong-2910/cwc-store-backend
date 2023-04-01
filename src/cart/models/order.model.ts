import { Schema } from 'mongoose';
import { COrderCart } from 'src/category/dto/deafaut.dto';
import { EStatusOrder, EStatusPaymentOrder } from 'src/common/common';

const orderSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    status_payment: {
      type: Number,
      require: true,
      default: EStatusPaymentOrder.NO_PAY,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    data: [
      {
        id: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: 'Post',
        },
        name: {
          type: String,
          require: true,
        },
        size: {
          type: Number,
          require: true,
        },
        size_id: {
          type: Schema.Types.ObjectId,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    status: {
      type: Number,
      require: true,
      default: EStatusOrder.PICKUP_PRODUCT,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  },
);

export { orderSchema };

export interface Order extends Document {
  name: string;

  email: string;

  phoneNumber: string;

  province: string;

  district: string;

  address: string;

  status_payment: EStatusPaymentOrder;

  price: number;
  status: EStatusOrder;
  data: COrderCart[];
}
