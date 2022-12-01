import React from 'react';
import currentStyles from './index.module.scss';
import { Pagination } from 'antd';
import { useNavigate } from "react-router";
import moment from "moment";
const TaskCard = (props : any)=>{
    const { cardInfo } = props;
    const { stats, id } = cardInfo;
    let unDoneSample = stats.new + stats.skipped;
    let doneSample = stats.done;
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
                && cardInfo.media_type === 'IMAGE' &&
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
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{cardInfo.created_by?.username}</div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{moment(cardInfo.created_at).format('YYYY-MM-DD HH:MM')}</div>
        {
            unDoneSample === doneSample && <div>
                完成
            </div>
        }
        {
            cardInfo.status !== 'FINISHED' || unDoneSample !== doneSample && <div>
                未完成
            </div>
        }
    </div>)
}
export  default TaskCard;
