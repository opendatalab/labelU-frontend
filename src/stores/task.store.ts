// @ts-ignore
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

const existTaskSlice = createSlice({
    name : 'existTask',
    initialState : {
        taskId : 0,
        taskName : '',
        taskDescription : '',
        taskTips : '',
        configStep : -1,
        haveConfigedStep : 0
    },
    reducers : {
        updateConfigStep : (state : any, action : any)=>{
            state.configStep = action.payload;
        },
        updateHaveConfigedStep : (state : any, action : any)=>{
            state.haveConfigedStep = action.payload;
        },
        updateTaskId (state : any, action : any) {
            state.taskId = action.payload;
        },
        updateTaskName (state : any, action : any) {
            state.taskName = action.payload;
        },
        updateTaskDescription (state : any, action : any) {
            state.taskDescription = action.payload;

        },
        updateTaskTips (state : any, action : any) {
            state.taskTips = action.payload;

        },
    }
});

export const {
    updateTaskId,
    updateTaskName,
    updateTaskDescription,
    updateTaskTips,
    updateConfigStep,
    updateHaveConfigedStep,
} = existTaskSlice.actions;

export default existTaskSlice.reducer;

