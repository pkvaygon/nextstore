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
}

const initialState: CartState = {
  items: [],
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
    },
  },
});

// Export the actions properly
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
