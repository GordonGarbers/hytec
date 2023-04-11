import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState{
    reset: boolean
}

const initialState: IInitialState = {
    reset: false
}

const resetFiltersSlice = createSlice({
    name: 'resetFilters',
    initialState,
    reducers:{
        onResetFilter: ((state: IInitialState, action: PayloadAction<boolean>) => {
            state.reset = action.payload
        })
    }
})

export default resetFiltersSlice.reducer;
export const {onResetFilter} = resetFiltersSlice.actions;