import { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
    },
    isCategoryProduct: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);

export { categorySchema };

export interface Category extends Document {
  name: string;
  parent: string;
  isCategoryProduct: boolean;
}
