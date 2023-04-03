import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataDetails } from "../../interfaces/interfaces";

interface IInitialState {
  dataIsLoaded: boolean;
  data: IDataDetails;
  dataError: string;
}

const initialState: IInitialState = {
  dataIsLoaded: false,
  data: {
    hero: [],
    products: [],
    nav: ["Home", "Machinery", "About Us", "Contact"],
    sections: {},
    dealer: {},
    buttons: {},
    numbers: {},
    form:{},
    footer:{}
  },
  dataError: "",
};

const datasSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    dataPedding: (state: IInitialState, action: PayloadAction<string>) => {
      state.dataIsLoaded = true;
    },

    dataFulfilled: (
      state: IInitialState,
      action: PayloadAction<IDataDetails>
    ) => {
      state.dataIsLoaded = false;
      state.data = action.payload;
    },

    dataReject: (state: IInitialState, action: PayloadAction<string>) => {
      state.dataIsLoaded = false;
      state.data = {
        hero: [],
        products: [],
        nav: [],
        sections: {},
        dealer: {},
        buttons: {},
        numbers: {},
        form:{},
        footer:{}
      };
      state.dataError = action.payload;
    },
  },
});

export default datasSlice.reducer;
export const { dataPedding, dataFulfilled, dataReject } = datasSlice.actions;
