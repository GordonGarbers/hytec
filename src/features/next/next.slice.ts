import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    next: number
}

const initialState: IInitialState={
    next:4
}

const nextSlice = createSlice({
    name: 'next',
    initialState,
    reducers:{
        setNext: ((state:IInitialState, action: PayloadAction<number>) => {
            state.next = state.next+action.payload
        })
    }
})

export default nextSlice.reducer;
export const {setNext} = nextSlice.actions;

