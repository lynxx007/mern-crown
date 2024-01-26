import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface Cart {
  items: Array<{
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    size: string[];
  }>;
}

const initialState: Cart = {
  items: [],
};

const cartSlice: Slice<Cart> = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        _id: string;
        name: string;
        imageUrl: string;
        price: number;
        quantity: number;
        size: string[];
      }>
    ) => {
      const { _id } = action.payload;

      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{
        _id: string;
        name: string;
        imageUrl: string;
        price: number;
        quantity: number;
        size: string[];
      }>
    ) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item: {
              _id: string;
              name: string;
              imageUrl: string;
              price: number;
              quantity: number;
              size: string[];
            }) => item._id !== action.payload._id
          );
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
    deleteItem: (
      state,
      action: PayloadAction<{
        _id: string;
        name: string;
        imageUrl: string;
        price: number;
        quantity: number;
        size: string[];
      }>
    ) => {
      state.items = state.items.filter(
        (item: {
          _id: string;
          name: string;
          imageUrl: string;
          price: number;
          quantity: number;
          size: string[];
        }) => item._id !== action.payload._id
      );
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, deleteItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
