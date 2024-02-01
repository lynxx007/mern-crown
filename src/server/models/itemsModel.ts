import mongoose, { Document, Schema, Model } from "mongoose";

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface Category {
  title: string;
  items: Item[];
}

interface ShopDataDocument extends Document {
  categories: Category[];
}

interface ShopDataModel extends Model<ShopDataDocument> {}

const ItemSchema = new Schema<Item>({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number,
});

const CategorySchema = new Schema<Category>({
  title: String,
  items: [ItemSchema],
});

const ShopData = mongoose.model<ShopDataDocument, ShopDataModel>(
  "ShopData",
  new Schema({
    categories: [CategorySchema],
  })
);

export default ShopData;
