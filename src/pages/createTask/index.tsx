import React from 'react';
import currentStyles from './index.module.scss';
const CreateTask = ()=>{
    const createTask = ()=>{
        alert('createTask')
    }
    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.createTaskIcon}></div>
        <div className = {currentStyles.createTask}
        onClick = {createTask}>
            新建任务
        </div>
    </div>)
}
export  default CreateTask;