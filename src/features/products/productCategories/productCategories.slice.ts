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

// interface IInitialState {
//   categories: string[];
// }

// const initialState: IInitialState = {
//   categories: [],
// };

// const productCategoriesSlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     addCategory: (state:IInitialState, action:PayloadAction<string>) => {
//       if(!state.categories.includes(action.payload)){
//         state.categories = [...state.categories, action.payload];
//       }
//     },

//     removeCategory: (state: IInitialState, action: PayloadAction<string>) => {
//         state.categories = state.categories.filter((categorie: string) => {
//           return categorie !== action.payload
//         })
//     }
//   },
// });

// export default productCategoriesSlice.reducer;
// export const {addCategory, removeCategory} = productCategoriesSlice.actions;
