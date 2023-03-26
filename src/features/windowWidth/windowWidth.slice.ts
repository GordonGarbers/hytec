import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  windowWidth: number;
}

const initialState: IInitialState = {
  windowWidth: 0,
};

const windowWidthSlice = createSlice({
  name: "windowWidth",
  initialState,
  reducers: {
    getWindowWidth: ((state: IInitialState, action: PayloadAction<number>) => {
        state.windowWidth = action.payload;
    })
  },
});

export default windowWidthSlice.reducer;
export const {getWindowWidth} = windowWidthSlice.actions;
