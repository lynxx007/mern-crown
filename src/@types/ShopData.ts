interface Item {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  size: string[];
}

export interface Category {
  title: string;
  items: Item[];
  _id: string;
}

interface ShopDataDocument extends Document {
  categories: Category[];
}

export default ShopDataDocument;
