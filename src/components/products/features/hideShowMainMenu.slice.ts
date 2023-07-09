import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  showHideMainMenu: boolean;
}

const initialState: IInitialState = {
  showHideMainMenu: true
};

const hideShowMainMenu = createSlice({
  name: "showHideMainMenu",
  initialState,
  reducers: {
    onMainMenuShowHide: (state: IInitialState, action: PayloadAction<boolean>) => {
    state.showHideMainMenu = action.payload;
    }
  },
});

export default hideShowMainMenu.reducer;
export const { onMainMenuShowHide} =
hideShowMainMenu.actions;