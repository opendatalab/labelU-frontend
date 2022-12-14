import React, { useState, useEffect } from 'react';
import  currentStyles  from  './index.module.scss';
import { updateSampleState, updateSampleAnnotationResult } from '../../services/samples';
import commonController from '../../utils/common/common';
import { useNavigate } from "react-router";
import { Observable, fromEvent, Subject } from 'rxjs' ;
import Ob from '../../utils/Observable/index';
import { useSelector} from "react-redux";
import { updateAnnotationDatas } from '../../stores/annotation.store'
import { annotationRef } from '../../pages/annotation2';
import { getSample } from '../../services/samples'
const AnnotationRightCorner = ()=>{
    const navigate = useNavigate();
    let annotationDatas = useSelector(state=> state.annotation.annotationDatas );
    // console.log(annotationDatas)
    let taskId = parseInt(window.location.pathname.split('/')[2]);
    let sampleId = parseInt(window.location.pathname.split('/')[4]);
    const [isSkippedShow, setIsSkippedShow] = useState('');
    const skipSample = ()=>{
        setIsSkippedShow('SKIPPED');
        getSample(taskId, sampleId).then((sampleRes : any)=>{
            if(sampleRes.status === 200){
                console.log(sampleRes)
                updateSampleState(taskId, sampleId, sampleRes?.data.data.data, 'SKIPPED').then(res=>{
                    if(res.status === 200) {
                        navigate(window.location.pathname + '?SKIPPED' + new Date().getTime());
                    }else{
                        commonController.notificationErrorMessage({message : '请求跳过失败'},1);
                    }
                }).catch(error=>{
                    commonController.notificationErrorMessage(error,1);
                })
            }else{
                commonController.notificationErrorMessage({message : '请求任务数据出错'},1)
            }
        }).catch(error=>commonController.notificationErrorMessage(error, 1));

    }
    const cancelSkipSample = ()=>{
        setIsSkippedShow('NEW');
        getSample(taskId, sampleId).then((sampleRes : any)=>{
            if(sampleRes.status === 200){
                console.log(sampleRes)
                updateSampleState(taskId, sampleId, sampleRes?.data.data.data, 'NEW').then(res=>{
                    if(res.status === 200) {
                        navigate(window.location.pathname + '?NEW' + new Date().getTime());
                    }else{
                        commonController.notificationErrorMessage({message : '请求跳过失败'},1);
                    }
                }).catch(error=>{
                    commonController.notificationErrorMessage(error,1);
                })
            }else{
                commonController.notificationErrorMessage({message : '请求任务数据出错'},1)
            }
        }).catch(error=>commonController.notificationErrorMessage(error, 1));
    }
    // @ts-ignore
    const nextPage = ()=>{
        // @ts-ignore
        // console.log(annotationDatas)
        // console.log(1)
        getSample(taskId, sampleId).then((res)=>{
            if(res.status === 200){
                let sampleResData = res.data.data.data;
                let annotated_count = 0;
                // @ts-ignore
                let  dataParam = Object.assign({},sampleResData,{ result :  annotationRef?.current?.getResult()[0].result});
                if (res.data.data.state !== 'SKIPPED') {
                    console.log(dataParam)
                    // console.log(record)
                    let resultJson = JSON.parse(dataParam.result);
                    // console.log(resultJson)
                    for (let key in resultJson) {
                        if(key.indexOf('Tool') > -1){
                            let tool = resultJson[key];
                            if (!tool.result) {
                                annotated_count = annotated_count + tool.length;
                            }else{
                                annotated_count = annotated_count + tool.result.length;
                            }
                        }
                    }
                    console.log(annotated_count)
                    // @ts-ignore
                    updateSampleAnnotationResult(taskId, sampleId, {annotated_count,state : 'DONE',data : dataParam }).then(res=>{
                        if(res.status === 200) {
                            // Ob.nextPageS.next('DONE');
                            navigate(window.location.pathname + '?DONE' + new Date().getTime());
                        }else{
                            commonController.notificationErrorMessage({message : '请求保存失败'},1);
                        }
                    }).catch(error=>{
                        commonController.notificationErrorMessage(error,1);
                    })
                }else{
                    navigate(window.location.pathname + '?SKIPPEDDONE' + new Date().getTime());
                }
            }else{

            }
        }).catch(error=>{
            commonController.notificationErrorMessage(error, 1)
        })

    }
    useEffect(()=>{
        getSample(taskId, sampleId).then((sampleRes : any)=>{
            console.log(sampleRes)
            if(sampleRes.status === 200) {
                if (!sampleRes.data.data.state) {
                    setIsSkippedShow('NEW');
                }else{
                    setIsSkippedShow(sampleRes.data.data.state);
                }
            }else{
                commonController.notificationErrorMessage({message : '请求保存失败'},1);
            }
        }).catch(error=>commonController.notificationSuccessMessage(error,1))
    },[window.location.pathname]);
    return (<div className={ currentStyles.outerFrame }>
        {isSkippedShow !== 'SKIPPED' && <div className={currentStyles.left} id = {'skipped'}
        onClick = { commonController.debounce(skipSample, 100) }>跳过</div>}
        {isSkippedShow === 'SKIPPED' && <div className={currentStyles.left}
                                id = {'skipped'}
        onClick = { commonController.debounce(cancelSkipSample, 100) }>取消跳过</div>}
        <div className={currentStyles.right}
        id = {'nextPage'}
             onClick = { commonController.debounce(nextPage, 100) }
        >下一页</div>
    </div>)
}
export default AnnotationRightCorner;