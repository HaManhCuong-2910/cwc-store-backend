import { Schema } from 'mongoose';

const responseSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'responses',
  },
);

export { responseSchema };

export interface Response extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
}
