import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
const TaskCard = ()=>{
    const createTask = ()=>{
        alert('createTask')
    }
    return (<div className = {currentStyles.outerFrame}>
        this is card
    </div>)
}
export  default TaskCard;