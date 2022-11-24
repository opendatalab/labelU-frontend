import React, { useState, useEffect } from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import TaskCard from '../../components/taskCard'
import { useNavigate } from 'react-router-dom';
import Constatns from '../../constants';
import {getTaskList, updateTaskConfig} from '../../services/createTask';
import CommonController from "../../utils/common/common";
import { useDispatch } from "react-redux";
import { updateConfigStep, updateHaveConfigedStep } from '../../stores/task.store';
const TaskList = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createTask = ()=>{
        dispatch(updateConfigStep(-1));
        dispatch(updateHaveConfigedStep(0));
        navigate(Constatns.urlToCreateTask);
    };
    // const taskCards : any[] = [
    //     {
    //     id : 1,
    //     name : 'ha'
    // }
    // ];
    // let n = 10;
    // while (n >0) {
    //     n = n - 1;
    //     taskCards.push({
    //         id : n,
    //         name : 'ha' + n
    //     })
    // }
    // taskCards.push({
    //     id : 'ji',
    //     name : 'ha ji'
    // });
    const [taskCards, setTaskCards] = useState<any>([]);
    useEffect(function (){
        getTaskList().then((res)=>{
            if(res){
                if(res.status === 200) {
                    setTaskCards(res.data.data);
                }else{
                    // CommonController.notificationErrorMessage({message : '拉取文件列表状态码不是200'},1);
                }
            }else{
                CommonController.notificationErrorMessage({message : '拉取文件列表失败, 请刷新页面'},1);
            }
        })
    },[]);


    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.createTaskButtonRow}>
            <div className = {currentStyles.createTaskButton}
            onClick = { createTask }
            >新建任务</div>
        </div>
        <div className = {currentStyles.cards}>
            {taskCards.length > 0 && taskCards.map((cardInfo : any)=>{
                return <TaskCard cardInfo = {cardInfo}/>
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