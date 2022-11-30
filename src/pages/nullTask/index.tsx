import React from 'react';
import currentStyles from './index.module.scss';
import {updateConfigStep, updateHaveConfigedStep} from "../../stores/task.store";
import Constatns from "../../constants";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const NullTask = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createTask = ()=>{
        dispatch(updateConfigStep(-1));
        dispatch(updateHaveConfigedStep(-1));
        navigate(Constatns.urlToCreateNewTask);
    }
    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.container}>
            <div className = {currentStyles.createTaskIcon} onClick = {createTask}></div>
            <div className = {currentStyles.createTask}
                 >
                新建任务
            </div>
        </div>
    </div>)
}
export  default NullTask;