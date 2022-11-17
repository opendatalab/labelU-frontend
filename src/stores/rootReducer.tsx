import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user.store';
import toolsConfigSliceReducer from './toolConfig.store';
import createTask from './createTask.store';


const rootReducer = combineReducers({
  user: userReducer,
  toolsConfig: toolsConfigSliceReducer,
  createTask
});

export default rootReducer;
