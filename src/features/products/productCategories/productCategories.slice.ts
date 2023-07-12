import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  categories: string;
}

const initialState: IInitialState = {
  categories: 'all',
};

const productCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state: IInitialState, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },

    removeCategory: (state: IInitialState, action: PayloadAction<string>) => {
      state.categories = "";
    },
  },
});

export default productCategoriesSlice.reducer;
export const { addCategory, removeCategory } = productCategoriesSlice.actions;


