import mongoose, { Document, Schema } from "mongoose";

interface ICartItem extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: Array<{
    item: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }>;
  createdAt: Date;
}

const CartSchema: Schema = new Schema<ICartItem>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model<ICartItem>("Cart", CartSchema);

export default Cart;
