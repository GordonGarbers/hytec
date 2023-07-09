import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  hytecPro: boolean;
}

const initialState: IInitialState = {
    hytecPro: true
};

const hytecProChangedSlice = createSlice({
  name: "hytec",
  initialState,
  reducers: {
    onHytecProChanged: (state: IInitialState, action: PayloadAction<boolean>) => {
    state.hytecPro = action.payload;
    }
  },
});

export default hytecProChangedSlice.reducer;
export const { onHytecProChanged} =
hytecProChangedSlice.actions;
