import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface SelectedColorProps{
    color: string,
    color2: string,
    hex: string,
    hex2: string
}

interface FilterProps {
    priceRange:number | number[];
    selectedSizes: string[];
    selectedColors: SelectedColorProps[];
    selectedCategories: string[];
    selectedGenders: string[];
    selectedBrands: string[];
  }

const initialState: FilterProps = {
    priceRange: [],
    selectedSizes: [],
    selectedColors: [],
    selectedCategories: [],
    selectedGenders: [],
    selectedBrands: [],
}

export const filterSlice = createSlice(({
    name: 'filter',
    initialState,
    reducers: {
          reduxPriceRange: (state, action: PayloadAction<number |number[]>) => {
            state.priceRange = action.payload;
          },
          reduxSelectedSizes: (state, action: PayloadAction<string>) => {
            if (state.selectedSizes.includes(action.payload)) {
                state.selectedSizes = state.selectedSizes.filter(size => size !== action.payload);
            } else {
                state.selectedSizes.push(action.payload);
            }
          },
          reduxSelectedColors: (state, action: PayloadAction<SelectedColorProps>) => {
            const existingColorIndex = state.selectedColors.findIndex(color => (
                color.color === action.payload.color &&
                color.color2 === action.payload.color2 &&
                color.hex === action.payload.hex &&
                color.hex2 === action.payload.hex2
            ));

            if (existingColorIndex !== -1) {
                state.selectedColors.splice(existingColorIndex, 1);
            } else {
                state.selectedColors.push(action.payload);
            }
          },
          reduxSelectedCategories: (state, action: PayloadAction<string>) => {
            if (state.selectedCategories.includes(action.payload)) {
              state.selectedCategories = state.selectedCategories.filter(category => category !== action.payload);
          } else {
              state.selectedCategories.push(action.payload);
          }
          },
          reduxSelectedGenders: (state, action: PayloadAction<string[]>) => {
            state.selectedGenders = action.payload;
          },
          reduxSelectedBrands: (state, action: PayloadAction<string[]>) => {
            state.selectedBrands = action.payload;
          },
    }


}))

export const { reduxSelectedColors,reduxSelectedSizes,reduxPriceRange,reduxSelectedCategories } = filterSlice.actions;
export default filterSlice.reducer;