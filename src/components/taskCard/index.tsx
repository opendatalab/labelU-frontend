import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import { useNavigate } from "react-router";
import moment from "moment";
import { Progress } from "antd";
import {CheckCircleOutlined} from '@ant-design/icons'
const TaskCard = (props : any)=>{
    const { cardInfo } = props;
    const { stats, id } = cardInfo;
    let unDoneSample = stats.new;
    let doneSample = stats.done  + stats.skipped;
    let total = unDoneSample + doneSample;
    const createTask = ()=>{
        alert('createTask')
    }
    const navigate = useNavigate();
    const turnToAnnotation = ()=>{
        // navigate('/taskList/task/taskAnnotation');
        navigate('/tasks/'+id);
    }
    return (<div className = {currentStyles.outerFrame}
    onClick = {turnToAnnotation}
    >
        <div className={currentStyles.item}>
            <div className = { currentStyles.itemTaskName }>{cardInfo.name}</div>
            {
                cardInfo.status !== 'DRAFT' &&
                cardInfo.status !== 'IMPORTED'
                &&
                <div className = { currentStyles.mediaType }>
                    <div style = {{ color : '#1b67ff' }}>图片</div>
                </div>
            }
            {
                (cardInfo.status === 'DRAFT' ||
                cardInfo.status === 'IMPORTED') &&
                <div className = { currentStyles.draft }>
                    <div style = {{ color : '#FF8800' }}>草稿</div>
                </div>
            }
            <div className = {currentStyles.icons}>
              <div></div>
              {<div></div>}
            </div>
        </div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{cardInfo.created_by?.username}</div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{moment(cardInfo.created_at).format('YYYY-MM-DD HH:MM')}</div>
        {
            unDoneSample === 0 && <div className = {currentStyles.item41}>
              <div className = {currentStyles.item41Left}>{total}/{total} </div>
              <div className = {currentStyles.item41Right}><CheckCircleOutlined style ={{color : '#00B365'}}/>已完成</div>
            </div>
        }
        {
          unDoneSample !== 0  && <div className = {currentStyles.item42}>
            <div className = {currentStyles.item42Left}><Progress percent={Math.trunc(50)} showInfo = {false}/></div>
            <div className = {currentStyles.item41Left}>{unDoneSample}/{total} </div>
            </div>
        }
    </div>)
}
export  default TaskCard;
