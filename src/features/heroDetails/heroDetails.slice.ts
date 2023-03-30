import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHeroDetails } from "../../interfaces/interfaces";

interface IInitialState{
    heroDetailsIsLoaded: boolean,
    heroDetailsData: IHeroDetails,
    heroDetailsError: string
}

const initialState: IInitialState = {
    heroDetailsIsLoaded: false,
    heroDetailsData: {hero:[]},
    heroDetailsError: ''
}

const heroDetailsSlice = createSlice({
    name: 'heroDetails',
    initialState,
    reducers:{
        heroDetailsPedding: ((state: IInitialState, action: PayloadAction<string>) => {
            state.heroDetailsIsLoaded = true
        }),

        heroDetailsFulfilled: ((state: IInitialState, action:PayloadAction<IHeroDetails>) => {
            state.heroDetailsIsLoaded = false;
            state.heroDetailsData = action.payload;
        }),

        heroDetailsReject: ((state: IInitialState, action: PayloadAction<string>) => {
            state.heroDetailsIsLoaded = false;
            state.heroDetailsData = {hero:[]};
            state.heroDetailsError = action.payload;
        })
    }
})

export default heroDetailsSlice.reducer;
export const {heroDetailsPedding, heroDetailsFulfilled, heroDetailsReject} = heroDetailsSlice.actions;