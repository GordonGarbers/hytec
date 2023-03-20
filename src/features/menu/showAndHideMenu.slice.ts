import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMenu {
  menu: boolean;
}

const initialState: IMenu = {
  menu: true,
};

const showAndHideMenuSlice = createSlice({
  name: 'showAndHide',
  initialState,
  reducers: {
    showAndHideManu: (state: IMenu, action: PayloadAction<boolean>) => {
      state.menu = action.payload;
    },
  },
});

export default showAndHideMenuSlice.reducer;
export const {showAndHideManu} = showAndHideMenuSlice.actions;
