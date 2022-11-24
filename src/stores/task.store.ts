// @ts-ignore
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

const existTaskSlice = createSlice({
    name : 'existTask',
    initialState : {
        configStep : -1,
        haveConfigedStep : 1
    },
    reducers : {
        updateConfigStep : (state : any, action : any)=>{
            state.configStep = action.payload;
        },
        updateHaveConfigedStep : (state : any, action : any)=>{
            state.haveConfigedStep = action.haveConfigedStep;
        }
    }
});

export const { updateConfigStep,
    updateHaveConfigedStep
} = existTaskSlice.actions;

export default existTaskSlice.reducer;

