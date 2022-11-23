import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import { useNavigate } from "react-router";

const TaskCard = (props : any)=>{
    const { cardInfo } = props;
    const createTask = ()=>{
        alert('createTask')
    }
    const navigate = useNavigate();
    const turnToAnnotation = ()=>{
        navigate('/taskList/taskAnnotation');
    }
    return (<div className = {currentStyles.outerFrame}>
        <div>
            <div>{cardInfo.name}</div>
            <div>{cardInfo.media_type}</div>
        </div>
        <div>{cardInfo.created_at}</div>
        <div>{cardInfo.name}</div>
        <div>{cardInfo.status}</div>
        <div onClick = { turnToAnnotation }>{'ti zhuan'}</div>
    </div>)
}
export  default TaskCard;