import mongoose, { Document, Schema } from "mongoose";

interface IProducts extends Document {
  category: string;
  info: Array<{
    name: string;
    price: number;
    imageUrl: string;
    size?: string[];
  }>;
}

const ProductSchema: Schema<IProducts> = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    info: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
        size: {
          type: [String],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProducts>("Product", ProductSchema);
export default Product;
