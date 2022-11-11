import React from 'react';
import currentStyles from './index.module.scss';
const CreateTask = ()=>{
    const createTask = ()=>{
        alert('createTask')
    }
    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.createTaskButton}>
            
        </div>
        <div className = {currentStyles.cards}
        onClick = {createTask}>
            新建任务
        </div>
        <div className = {currentStyles.pagination}>
            分页
        </div>
    </div>)
}
export  default CreateTask;