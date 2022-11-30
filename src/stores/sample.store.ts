// @ts-ignore
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

const samplesSlice = createSlice({
    name : 'samples',
    initialState : {
        newSamples : []
    },
    reducers : {
        updateNewSamples : (state : any, action : any)=>{
            state.newSamples = action.payload;
        }
    }
});

export const {
    updateNewSamples
} = samplesSlice.actions;

export default samplesSlice.reducer;

