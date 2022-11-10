import React from 'react';
import currentStyles from './index.module.scss';
const NullTask = ()=>{
    const createTask = ()=>{
        alert('createTask')
    }
    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.container}>
            <div className = {currentStyles.createTaskIcon}></div>
            <div className = {currentStyles.createTask}
                 onClick = {createTask}>
                新建任务
            </div>
        </div>

    </div>)
}
export  default NullTask;