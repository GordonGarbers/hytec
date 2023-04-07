import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPriceRange } from '../../../interfaces/interfaces';


const initialState: IPriceRange = {
    min: 0,
    max: 1,
};

const productPricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    addPrice: (state: IPriceRange, action: PayloadAction<IPriceRange>) => {
      state.min = action.payload.min
      state.max = action.payload.max
    },

  },
});

export default productPricesSlice.reducer;
export const { addPrice } = productPricesSlice.actions;

