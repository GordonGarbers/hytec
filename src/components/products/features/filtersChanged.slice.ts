import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  filters: string[];
}

const initialState: IInitialState = {
  filters: [],
};

const filtersChangedSlice = createSlice({
  name: "filtersChanged",
  initialState,
  reducers: {
    onFiltersChanged: (state: IInitialState, action: PayloadAction<string>) => {
      if (!state.filters.includes(action.payload))
        state.filters = [...state.filters, action.payload];
    },

    onFiltersRemove: (state: IInitialState, action: PayloadAction<string>) => {
      state.filters = state.filters.filter(
        (filter: string) => filter !== action.payload
      );
    },
    onFiltersClear: (state: IInitialState) => {
      state.filters = [];
    },
  },
});

export default filtersChangedSlice.reducer;
export const { onFiltersChanged, onFiltersRemove, onFiltersClear} =
  filtersChangedSlice.actions;
