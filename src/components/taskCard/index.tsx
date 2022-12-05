import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import { useNavigate } from "react-router";
import moment from "moment";
import { Progress } from "antd";
import commonController from '../../utils/common/common'
import { outputSamples } from "../../services/samples";
import {CheckCircleOutlined, UploadOutlined, DeleteOutlined} from '@ant-design/icons'
import { deleteTask } from "../../services/createTask";

const TaskCard = (props : any)=>{
    const { cardInfo } = props;
    const { stats, id, status } = cardInfo;
    let unDoneSample = stats.new;
    let doneSample = stats.done  + stats.skipped;
    let total = unDoneSample + doneSample;
    const createTask = ()=>{
        alert('createTask')
    }
    const navigate = useNavigate();
    const turnToAnnotation = (e:any)=>{
        e.stopPropagation();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        // navigate('/taskList/task/taskAnnotation');
        navigate('/tasks/'+id);
    }
    let localUserEmail = localStorage.getItem('username');

    const outputDataLocal = (e : any)=>{
        outputSamples(id)
    }

    const deleteTaskLocal= (e : any)=>{
        // console.log(e);
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        deleteTask(id).then((res:any)=>{
            if(res.status === 200){
                navigate('/tasks?'+new Date().getTime())
            }else{
                commonController.notificationErrorMessage({message : '删除不成功'},100)
            }
        }).catch(e=>commonController.notificationErrorMessage(e,1))
        e.stopPropagation();

    }
    return (<div className = {currentStyles.outerFrame}
    onClick = {turnToAnnotation}
    >
        <div className={currentStyles.item}>
            <div className={currentStyles.itemLeft}>
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
            </div>
            <div className = {currentStyles.icons2}>
              <div className = {currentStyles.upload}
              onClick = {commonController.debounce(outputDataLocal,100)}
              ><UploadOutlined /></div>
              {localUserEmail === cardInfo.created_by.username && <div
                  onClick={deleteTaskLocal}
                  className = {currentStyles.delete}><DeleteOutlined/></div>}
            </div>
        </div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{cardInfo.created_by?.username}</div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{moment(cardInfo.created_at).format('YYYY-MM-DD HH:MM')}</div>
        {
            (doneSample === total) && <div className = {currentStyles.item41}>
              <div className = {currentStyles.item41Left}>{total}/{total} </div>
              <div className = {currentStyles.item41Right}><CheckCircleOutlined style ={{color : '#00B365'}}/>&nbsp;已完成</div>
            </div>
        }
        {
            (doneSample !== total && status !== 'DRAFT' && status !== 'IMPORTED') && <div className = {currentStyles.item42}>
            <div className = {currentStyles.item42Left}><Progress percent={Math.trunc(doneSample*100/total)} showInfo = {false}/></div>
            <div className = {currentStyles.item41Left}>&nbsp;&nbsp;{doneSample}/{total} </div>
            </div>
        }
    </div>)
}
export  default TaskCard;
