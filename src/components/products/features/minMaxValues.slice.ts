import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRange } from "../../../interfaces/interfaces";


interface IAction{
    name:string,
    minMax: IRange
}

// interface IInitialProps{
//     [key:string]: {minimum: number, maximum: number};
// }

// const initialState: IInitialProps = {
//     "price":{minimum: 0, maximum: 1},
//     "weight":{minimum: 0, maximum: 1},
//     "displacement":{minimum: 0, maximum: 1},
//     "fuel tank":{minimum: 0, maximum: 1},
// }

interface IInitialProps{
    [key:string]: {minimum: number | undefined, maximum: number | undefined};
}

const initialState: IInitialProps = {
    "price":{minimum: undefined, maximum: undefined},
    "weight":{minimum: undefined, maximum: undefined},
    "displacement":{minimum: undefined, maximum: undefined},
    "fuel tank":{minimum: undefined, maximum: undefined},
}


const minMaxValueSlice = createSlice({
    name: 'resetFilters',
    initialState,
    reducers:{
        onMinMaxSave: ((state: IInitialProps, action: PayloadAction<IAction>) => {
            state[action.payload.name].minimum  = action.payload.minMax.min
            state[action.payload.name].maximum  = action.payload.minMax.max
    })
    }
})

export default minMaxValueSlice.reducer;
export const {onMinMaxSave} = minMaxValueSlice.actions;