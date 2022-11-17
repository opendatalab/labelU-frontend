import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import TaskCard from '../../components/taskCard'
import { useNavigate } from 'react-router-dom';
import Constatns from '../../constants';
const TaskList = ()=>{
    const navigate = useNavigate();
    const createTask = ()=>{
        navigate(Constatns.urlToCreateTask);
        // alert('createTask')
    };
    const taskCards : any[] = [
        {
        id : 1,
        name : 'ha'
    }
    ];
    let n = 10;
    while (n >0) {
        n = n - 1;
        taskCards.push({
            id : n,
            name : 'ha' + n
        })
    }
    taskCards.push({
        id : 'ji',
        name : 'ha ji'
    });



    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.createTaskButtonRow}>
            <div className = {currentStyles.createTaskButton}
            onClick = { createTask }
            >新建任务</div>
        </div>
        <div className = {currentStyles.cards}>
            {taskCards.length > 0 && taskCards.map((cardInfo : any)=>{
                return <TaskCard />
            })}
            {/*{*/}
            {/*    taskCards.length === 0 && */}
            {/*}*/}
            {/*{*/}
            {/*    taskCards.length > 0 && <div className = {currentStyles.stationSymbol}>*/}

            {/*    </div>*/}
            {/*}*/}

        </div>
        <div className = {currentStyles.pagination}>
            <Pagination
                defaultCurrent={1}
                total={50}
            />
        </div>

    </div>)
}
export  default TaskList;