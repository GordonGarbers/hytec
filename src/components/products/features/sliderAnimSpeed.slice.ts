import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  animSpeed: number;
}

const initialState: IInitialState = {
  animSpeed: 0,
};

const sliderAnimSpeedsSlice = createSlice({
  name: "resetFilters",
  initialState,
  reducers: {
    onSliderSpeedChange: (
      state: IInitialState,
      action: PayloadAction<number>
    ) => {
      state.animSpeed = action.payload;
    },
  },
});

export default sliderAnimSpeedsSlice.reducer;
export const { onSliderSpeedChange } = sliderAnimSpeedsSlice.actions;
