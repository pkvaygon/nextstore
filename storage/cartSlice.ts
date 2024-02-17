// cartSlice.ts
import { ProductItemProps } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    items: ProductItemProps[];
    cs: number
}

const initialState: CartState = {
    items: [],
    cs: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
    reducers: {
        test: (state) => {
            state.cs += 1; // Обновляем cs на 1
          }
  },
});

export const {test} = cartSlice.actions;
export default cartSlice.reducer;
