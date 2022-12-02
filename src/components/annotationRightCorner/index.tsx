import React from 'react';
import  currentStyles  from  './index.module.scss';
import { updateSampleState } from '../../services/samples';
import commonController from '../../utils/common/common';
import { useNavigate } from "react-router";

const AnnotationRightCorner = ()=>{
    const navigate = useNavigate();
    let taskId = parseInt(window.location.pathname.split('/')[2]);
    let sampleId = parseInt(window.location.pathname.split('/')[4]);
    const skipSample = ()=>{
        updateSampleState(taskId, sampleId).then(res=>{
            if(res.status === 200) {
                navigate(window.location.pathname + '?state=SKIPPED')
            }else{
                commonController.notificationErrorMessage({message : '请求跳过失败'},1);
            }
        }).catch(error=>{
            commonController.notificationErrorMessage(error,1);
        })
    }
    return (<div className={ currentStyles.outerFrame }>
        <div className={currentStyles.left}
        onClick = { commonController.debounce(skipSample, 100) }>取消跳过</div>
        <div className={currentStyles.right}>下一页</div>
    </div>)
}
export default AnnotationRightCorner;