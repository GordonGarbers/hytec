import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRange } from "../../../interfaces/interfaces";

export interface IInitialState {
  kw: IRange;
  ps: IRange;
  displacement: IRange;
  fuelTankCapacity: IRange;
  speed: IRange;
  weight: IRange;
  liftingCapacity: IRange;
  liftingHeight: IRange;
  totalLength: IRange;
  totalWidth: IRange;
  totalHeight: IRange;
  wheelbase: IRange;
  price: IRange;
}

const initialStateValue: IRange = {
  min: 0,
  max: 0,
};

const initialState: IInitialState = {
  kw: initialStateValue,
  ps: initialStateValue,
  displacement: initialStateValue,
  fuelTankCapacity: initialStateValue,
  speed: initialStateValue,
  weight: initialStateValue,
  liftingCapacity: initialStateValue,
  liftingHeight: initialStateValue,
  totalLength: initialStateValue,
  totalWidth: initialStateValue,
  totalHeight: initialStateValue,
  wheelbase: initialStateValue,
  price: initialStateValue,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterKw: (state: IInitialState, action: PayloadAction<IRange>) => {
      state.kw = action.payload
    },
    filterPs: (state: IInitialState, action: PayloadAction<IRange>) => {
      state.ps = action.payload;
    },
    filterDisplacement: (
      state: IInitialState,
      action: PayloadAction<IRange>
    ) => {
      state.displacement = action.payload;
    },
    filterFuelTankCapacity: (
      state: IInitialState,
      action: PayloadAction<IRange>
    ) => {
      state.fuelTankCapacity = action.payload;
    },
    filterSpeed: (state: IInitialState, action: PayloadAction<IRange>) => {
      state.speed =  action.payload;
    },
    filterWeight: (state: IInitialState, action: PayloadAction<IRange>) => {
      state.weight = action.payload
    },
    filterLiftingCapacity: (
      state: IInitialState,
      action: PayloadAction<IRange>
    ) => {
      state.liftingCapacity = action.payload;
    },
    filterLiftingHeight: (
      state: IInitialState,
      action: PayloadAction<IRange>
    ) => {
      state.liftingHeight = action.payload
    },
    filterTotalLength: (
      state: IInitialState,
      action: PayloadAction<IRange>
    ) => {
      state.totalLength = action.payload 
    },
    filterTotalWidth: (state: IInitialState, action: PayloadAction<IRange>) => {
      state.totalWidth = action.payload
    },
    filterTotalHeight: (
      state: IInitialState,
      action: PayloadAction<IRange>
    ) => {
      state.totalHeight = action.payload
    },
    filterWheelbase: (state: IInitialState, action: PayloadAction<IRange>) => {
      state.wheelbase = action.payload;
    },
    filterPrice: (state: IInitialState, action: PayloadAction<IRange>) => {
      state.price = action.payload
    },
  },
});

export default filterSlice.reducer;
export const {
  filterKw,
  filterPs,
  filterDisplacement,
  filterFuelTankCapacity,
  filterSpeed,
  filterWeight,
  filterLiftingCapacity,
  filterLiftingHeight,
  filterTotalLength,
  filterTotalWidth,
  filterTotalHeight,
  filterWheelbase,
  filterPrice
} = filterSlice.actions;
