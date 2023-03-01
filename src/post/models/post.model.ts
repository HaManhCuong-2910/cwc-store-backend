import { Schema } from 'mongoose';
import { TQuantity } from '../dto/deafaut.dto';

const postSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'Category',
    },
    price: {
      type: Number,
      require: true,
    },
    sales: {
      type: Number,
    },
    is_hot: {
      type: Boolean,
    },
    slug: {
      type: String,
      require: true,
    },
    images: {
      type: [String],
      require: true,
    },
    quantities: [
      {
        size: {
          type: Number,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'posts',
  },
);

export { postSchema };

export interface Post extends Document {
  name: string;
  description: string;
  price: number;
  sales: number;
  is_hot: boolean;
  category: string;
  quantities: TQuantity[];
  images: HTMLCollectionOf<HTMLImageElement>;
}
