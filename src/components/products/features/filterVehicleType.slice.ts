import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    vehicleTypeCheckers: string[]
}

const initialState: IInitialState = {
    vehicleTypeCheckers: ["hytec", "hytec pro"]
}

const filterVehicleTypeSlice = createSlice({
    name:'filterVehicleType',
    initialState,
    reducers:{
        addVehicleType: (state: IInitialState, action: PayloadAction<string>) => {
            if(!state.vehicleTypeCheckers.includes(action.payload)){
                state.vehicleTypeCheckers = [...state.vehicleTypeCheckers, action.payload]
            }
        },
        removeVehicleType: (state: IInitialState, action: PayloadAction<string>) => {
            if(state.vehicleTypeCheckers.includes(action.payload)){
                state.vehicleTypeCheckers = state.vehicleTypeCheckers.filter((vehicleType: string)=>{
                    return vehicleType !== action.payload
                })
            }
        }
    }
})

export default filterVehicleTypeSlice.reducer;
export const { addVehicleType, removeVehicleType} =
  filterVehicleTypeSlice.actions;