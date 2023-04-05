import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  categories: string[];
}

const initialState: IInitialState = {
  categories: [],
};

const productCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state: IInitialState, action: PayloadAction<string>) => {
      state.categories = [...state.categories, action.payload];
    },
  },
});

export default productCategoriesSlice.reducer;
export const {addCategory} = productCategoriesSlice.actions;
