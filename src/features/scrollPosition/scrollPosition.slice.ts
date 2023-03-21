import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  scrollY: number;
}

const initialState: IInitialState = {
  scrollY: window.pageYOffset ?? 0,
};

const scrollPositionSlice = createSlice({
    name:'scrollY',
    initialState, 
    reducers:{
        getScrollY: (state:IInitialState, action:PayloadAction<number>)=>{
            state.scrollY = action.payload;
        },

        clearScrollY: (state:IInitialState) => {
            state.scrollY = 0;
        }
    }
});

export default scrollPositionSlice.reducer;
export const {getScrollY, clearScrollY} = scrollPositionSlice.actions;


