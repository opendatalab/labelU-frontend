import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import { useNavigate } from "react-router";
import moment from "moment";
const TaskCard = (props : any)=>{
    const { cardInfo } = props;
    const { annotated_count, total } = cardInfo;
    const createTask = ()=>{
        alert('createTask')
    }
    const navigate = useNavigate();
    const turnToAnnotation = ()=>{
        // navigate('/taskList/task/taskAnnotation');
        navigate('/taskList/samples');
    }
    return (<div className = {currentStyles.outerFrame}
    onClick = {turnToAnnotation}
    >
        <div className={currentStyles.item}>
            <div className = { currentStyles.itemTaskName }>{cardInfo.name}</div>
            {
                cardInfo.status === 1 && cardInfo.media_type === 'IMAGE' &&
                <div className = { currentStyles.mediaType }>
                    <div style = {{ color : '#1b67ff' }}>图片</div>
                </div>
            }
            {
                cardInfo.status !== 1 &&
                <div className = { currentStyles.draft }>
                    <div style = {{ color : '#FF8800' }}>草稿</div>
                </div>
            }
        </div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{cardInfo.created_by?.username}</div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{moment(cardInfo.created_at).format('YYYY-MM-DD HH:MM')}</div>
        {
            cardInfo.status === 1 && annotated_count === total && <div>
                完成
            </div>
        }
        {
            cardInfo.status === 1 && annotated_count !== total && <div>
                未完成
            </div>
        }
    </div>)
}
export  default TaskCard;
