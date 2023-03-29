import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  pauseAnim: boolean;
}

const initialState: IInitialState = {
    pauseAnim: false,
};

const pauseSlice = createSlice({
  name: "pause",
  initialState,
  reducers: {
    pauseHero: (state: IInitialState, action: PayloadAction<boolean>) => {
      state.pauseAnim = action.payload;
    },
  },
});

export default pauseSlice.reducer;
export const { pauseHero } = pauseSlice.actions;
