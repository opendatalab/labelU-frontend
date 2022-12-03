import React, { useEffect } from 'react';
import  currentStyles  from  './index.module.scss';
import { updateSampleState, updateSampleAnnotationResult } from '../../services/samples';
import commonController from '../../utils/common/common';
import { useNavigate } from "react-router";
import { Observable, fromEvent } from 'rxjs' ;
import Ob from '../../utils/Observable/index';
import { useSelector} from "react-redux";
import { updateAnnotationDatas } from '../../stores/annotation.store'
import { annotationRef } from '../../pages/annotation2'
const AnnotationRightCorner = ()=>{
    const navigate = useNavigate();
    let annotationDatas = useSelector(state=> state.annotation.annotationDatas );
    // console.log(annotationDatas)
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

    // @ts-ignore
    const nextPage = ()=>{
        // @ts-ignore
        // console.log(annotationDatas)
        // @ts-ignore
        updateSampleAnnotationResult(taskId, sampleId, {result : annotationRef?.current?.getResult()[0].result }).then(res=>{
            if(res.status === 200) {
                navigate(window.location.pathname + '?state=DONE')
            }else{
                commonController.notificationErrorMessage({message : '请求保存失败'},1);
            }
        }).catch(error=>{
            commonController.notificationErrorMessage(error,1);
        })
    }
    useEffect(()=>{
        // @ts-ignore
        Ob.skipped = fromEvent(document.getElementById('skipped'), 'click');
        // @ts-ignore
        Ob.nextPage = fromEvent(document.getElementById('nextPage'), 'click');
    },[])
    return (<div className={ currentStyles.outerFrame }>
        <div className={currentStyles.left} id = {'skipped'}
        onClick = { commonController.debounce(skipSample, 100) }>取消跳过</div>
        <div className={currentStyles.right}
        id = {'nextPage'}
             onClick = { commonController.debounce(nextPage, 100) }
        >下一页</div>
    </div>)
}
export default AnnotationRightCorner;