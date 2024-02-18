// cartSlice.ts
"use client";
import { ProductItemProps } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReduxColorProps = {
  color: string,
  color2: string,
  hex: string,
  hex2: string
}
export interface ReduxItemsProps{
  _id: {
    $oid: string;
  };
  label: string;
  sizes: string[],
  price: number,
  colors: ReduxColorProps[]
  image: string;
  quantity: number;
}
interface CartState {
  items: ReduxItemsProps[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ReduxItemsProps>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => newItem._id.$oid === item._id.$oid
      );
      if (existingItem) {
          existingItem.quantity += 1;
        } 
       else {
        state.items.push({...newItem, quantity: 1,});
      }
      state.totalPrice += newItem.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      const indexToRemove = state.items.findIndex(
        (item) => item._id.$oid === idToRemove
      );
      if (indexToRemove !== -1) {
        const removedItem = state.items[indexToRemove];
        state.totalPrice -= removedItem.price * removedItem.quantity;
        state.items.splice(indexToRemove, 1);
      }
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const idToIncrement = action.payload;
      const itemToIncrement = state.items.find(
        (item) => item._id.$oid === idToIncrement
      );
      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
        state.totalPrice += itemToIncrement.price;
      }
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const idToDecrement = action.payload;
      const itemToDecrement = state.items.find(
        (item) => item._id.$oid === idToDecrement
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
        state.totalPrice -= itemToDecrement.price;
      }
    },
  },
});

export const { addToCart,removeFromCart,incrementItem,decrementItem } = cartSlice.actions;
export default cartSlice.reducer;
