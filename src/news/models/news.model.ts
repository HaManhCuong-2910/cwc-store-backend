import { Schema } from 'mongoose';

const newSchema = new Schema(
  {
    author: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    short_description: {
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
    collection: 'news',
  },
);

export { newSchema };

export interface News extends Document {
  author: string;

  img: string;

  title: string;

  short_description: string;

  description: string;
}
