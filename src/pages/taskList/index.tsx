import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import TaskCard from '../../components/taskCard'
const TaskList = ()=>{
    const createTask = ()=>{
        alert('createTask')
    };
    const taskCards : any[] = [{
        id : 1,
        name : 'ha'
    }];
    let n = 10;
    while (n >0) {
        n = n - 1;
        taskCards.push({
            id : n,
            name : 'ha' + n
        })
    }
    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.createTaskButtonRow}>
            <div className = {currentStyles.createTaskButton}>新建任务</div>
        </div>
        <div className = {currentStyles.cards}>
            {taskCards.map((cardInfo : any)=>{
                return <TaskCard />
            })}
            <div className = {currentStyles.pagination}>
                <Pagination
                    defaultCurrent={1}
                    total={50}
                />
            </div>
        </div>

    </div>)
}
export  default TaskList;