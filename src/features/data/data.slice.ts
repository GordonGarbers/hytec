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
    products:[],
    hero: [],
    // nav: ["Home", "Machinery", "About Us", "Contact"],
    nav: [],
    sections: {},
    dealer: {},
    buttons: {},
    numbers: {},
    form:{},
    footer:{},
    text:{}
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
        footer:{},
        text:{}
      };
      state.dataError = action.payload;
    },
  },
});

export default datasSlice.reducer;
export const { dataPedding, dataFulfilled, dataReject } = datasSlice.actions;
