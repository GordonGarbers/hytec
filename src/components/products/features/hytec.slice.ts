import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  hytec: boolean;
}

const initialState: IInitialState = {
    hytec: true
};

const hytecChangedSlice = createSlice({
  name: "hytec",
  initialState,
  reducers: {
    onHytecChanged: (state: IInitialState, action: PayloadAction<boolean>) => {
    state.hytec = action.payload;
    }
  },
});

export default hytecChangedSlice.reducer;
export const { onHytecChanged} =
hytecChangedSlice.actions;
