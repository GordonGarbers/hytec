import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState{
    language: string
}

const initialState: IInitialState = {
    language: 'de'
}

const changeLanguageSlice = createSlice({
    name: 'changeLanguage',
    initialState,
    reducers:{
        switchLanguage: ((state:IInitialState, action: PayloadAction<string>)=>{
            state.language = action.payload
        })
    }
})

export default changeLanguageSlice.reducer;
export const {switchLanguage} = changeLanguageSlice.actions;