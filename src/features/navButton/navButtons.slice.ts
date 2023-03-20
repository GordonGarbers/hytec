import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INavigationButton } from "../../interfaces/interfaces";

const initialState: INavigationButton = {
    activeBtnValue: 0,
    activeBtnName: ''
}

const navButtonsSlice = createSlice({
    name:'navButtons',
    initialState,
    reducers:{
        setNavButton: (state: INavigationButton, action: PayloadAction<INavigationButton>) =>{
            state.activeBtnValue = action.payload.activeBtnValue;
            state.activeBtnName = action.payload.activeBtnName;
        }
    }
})

export default navButtonsSlice.reducer;
export const {setNavButton} = navButtonsSlice.actions;

