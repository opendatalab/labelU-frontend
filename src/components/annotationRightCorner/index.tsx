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
import { getSample, } from '../../services/samples';
import TempStore from "./tempStore";
const AnnotationRightCorner = ()=>{
    const navigate = useNavigate();
    let annotationDatas = useSelector(state=> state.annotation.annotationDatas );
    // console.log(annotationDatas)
    let taskId = parseInt(window.location.pathname.split('/')[2]);
    let sampleId = parseInt(window.location.pathname.split('/')[4]);
    const [isSkippedShow, setIsSkippedShow] = useState('');
    // const [currentSampleId, setCurrentSampleId] = useState(0);
    let currentSampleId = 0;
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
  // let timestamp = new Date().getTime();
    const [timestamp, setTimestamp] = useState(new Date().getTime());
    const [oldCurrentSampleId, setOldCurrentSampleId] = useState(0);
  // console.log(123456678);
  // @ts-ignore
    const nextPage = async function (){
      // console.trace();
      // console.log(timestamp);
      // console.log(new Date().getTime());
      // console.log(new Date().getTime() - timestamp)
      // if (new Date().getTime() - timestamp <= 2000) {
      //   setTimestamp(new Date().getTime());
      //   return;
      // }
      // setTimestamp(new Date().getTime());
      // console.log('llllllllll')
      timestampNew = new Date().getTime();
      // @ts-ignore
        // console.log(annotationDatas)
        // console.log(1)
        // console.log({sampleId});
      let sampleId = parseInt(window.location.pathname.split('/')[4]);

      // console.log({sampleId, currentSampleId});
      // if (sampleId === currentSampleId || currentSampleId === oldCurrentSampleId){
      //   // currentSampleId
      //   setOldCurrentSampleId(currentSampleId);
      //   return;
      // }
      // setOldCurrentSampleId(sampleId);
      // currentSampleId = sampleId;
      // @ts-ignore
      let cResult = await annotationRef?.current?.getResult();
      let rResult = cResult[0].result;
      console.log(rResult);
      getSample(taskId, sampleId).then((res)=>{
        // console.log({
        //   oldCurrentSampleId,
        //   sampleId
        // })
        //   setOldCurrentSampleId(sampleId);
        //   if (oldCurrentSampleId === sampleId) return;
          // console.log(res);
            if(res.status === 200){
                let sampleResData = res.data.data.data;
                let annotated_count = 0;
                // @ts-ignore
              console.log(annotationRef?.current?.getResult()[0]);

                // @ts-ignore
                // @ts-ignore
              // let  dataParam = Object.assign({},sampleResData,{ result :  annotationRef?.current?.getResult()[0].result});
              let  dataParam = Object.assign({},sampleResData,{ result :  rResult});
                if (res.data.data.state !== 'SKIPPED') {
                    console.log(dataParam)
                    // console.log(record)
                    let resultJson = JSON.parse(dataParam.result);
                    // console.log(resultJson)
                    for (let key in resultJson) {
                        if(key.indexOf('Tool') > -1 && key !== 'textTool' && key !== 'tagTool'){
                            let tool = resultJson[key];
                            if (!tool.result) {
                                let temp = 0;
                                if(tool.length){ temp = tool.length}
                                annotated_count = annotated_count + temp;
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
                      // timestampNew = new Date().getTime();

                    }).catch(error=>{
                        commonController.notificationErrorMessage(error,1);
                      // timestampNew = new Date().getTime();

                    })
                }else{
                    navigate(window.location.pathname + '?JUMPDOWN' + new Date().getTime());
                  // timestampNew = new Date().getTime();

                }
            }else{
              // timestampNew = new Date().getTime();
            }
        }).catch(error=>{
            commonController.notificationErrorMessage(error, 1)
            // timestampNew = new Date().getTime();
        })

    }

    const prevPage = async function () {
      if (new Date().getTime() - timestamp <= 2000) {
        setTimestamp(new Date().getTime());
        return;
      }
      setTimestamp(new Date().getTime());
      // console.log('tttttttttttttt')
        // @ts-ignore
        // console.log(annotationDatas)
      let sampleId = parseInt(window.location.pathname.split('/')[4]);
      // console.log(newSampleId);
      // console.log({sampleId})
      // @ts-ignore
      let cResult = await annotationRef?.current?.getResult();
      let rResult = cResult[0].result;
      console.log(rResult);

        getSample(taskId, sampleId)
            .then((res)=>{
              // console.log(res)
            if(res.status === 200){
                let sampleResData = res.data.data.data;
                let annotated_count = 0;
                // @ts-ignore
                // let  dataParam = Object.assign({},sampleResData,{ result :  annotationRef?.current?.getResult()[0].result});
                let  dataParam = Object.assign({},sampleResData,{ result :  rResult });
                if (res.data.data.state !== 'SKIPPED') {
                    // console.log(dataParam)
                    // console.log(record)
                    let resultJson = JSON.parse(dataParam.result);
                    // console.log(resultJson)
                    for (let key in resultJson) {
                        if(key.indexOf('Tool') > -1 && key !== 'textTool' && key !== 'tagTool'){
                            let tool = resultJson[key];
                            if (!tool.result) {
                                let temp = 0;
                                if(tool.length){ temp = tool.length}
                                annotated_count = annotated_count + temp;
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
                            navigate(window.location.pathname + '?PREV' + new Date().getTime());
                        }else{
                            commonController.notificationErrorMessage({message : '请求保存失败'},1);
                        }
                    }).catch(error=>{
                        commonController.notificationErrorMessage(error,1);
                    })
                }else{
                    navigate(window.location.pathname + '?JUMPUP' + new Date().getTime());
                }
            }else{

            }
        }).catch(error=>{
            commonController.notificationErrorMessage(error, 1)
        })

    }
  const copyPre = ()=>{
    // console.log(22222)
    navigate(window.location.pathname + '?COPYPRE' + new Date().getTime());
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

    let timestampNew = new Date().getTime();
    let oldTimestampNew = 0;
    let count = 1;
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    const onKeyDown = (e:any)=>{
      // console.log(e)
      // console.log(count);
      // count = count + 1;

      // console.trace();
      // e.nativeEvent.stopPropagation();
      // e.stopPropagation();
      // e.preventDefault();
      // console.log('zzzzzzzzzzzzzzzzzzzzzz1');
      timestampNew = new Date().getTime();
      console.log({
        timestampNew,
        now : new Date().getTime(),
        diff : timestampNew - TempStore.old,
        old : TempStore.old
      })
      if (TempStore.old != 0 && timestampNew - TempStore.old <= 500) {
        timestampNew = new Date().getTime();
        TempStore.old  = new Date().getTime();
        return;
      }
      oldTimestampNew = new Date().getTime();
      TempStore.old = new Date().getTime();
      console.log(e);
        let keyCode = e.keyCode;
        if (keyCode === 65) {
          // console.log(111111111111);
          // prevPage();
          commonController.debounce(prevPage, 1000)('');
        }
        if (keyCode === 68) {
          // console.log(2222222222222);
          nextPage();
          // commonController.debounce(nextPage, 1000)('');
        }
    }


    useEffect(()=>{
        // @ts-ignore
      // document.addEventListener('keyup', commonController.debounce(onKeyDown,1000));
      document.addEventListener('keyup', onKeyDown);
    },[])

    return (<div className={ currentStyles.outerFrame } id = 'rightCorner'>
      <div className={currentStyles.left}
           id = {'copyPre'}
           onClick = { commonController.debounce(copyPre, 100) }
      >复制上张</div>
        {/*<div className={currentStyles.right}*/}
        {/*     id = {'nextPage'}*/}
        {/*     onClick = { commonController.debounce(prevPage, 100) }*/}
        {/*>上一页</div>*/}
        <div className={currentStyles.right}>
          {isSkippedShow !== 'SKIPPED' && <div className={currentStyles.rightLeft} id = {'skipped'}
          onClick = { commonController.debounce(skipSample, 100) }>跳过</div>}
          {isSkippedShow === 'SKIPPED' && <div className={currentStyles.rightLeft}
                                  id = {'skipped'}
          onClick = { commonController.debounce(cancelSkipSample, 100) }>取消跳过</div>}
          <div className={currentStyles.rightRight}
          id = {'nextPage'}
               onClick = { commonController.debounce(nextPage, 100) }
          >下一页</div>
        </div>
    </div>)
}
export default AnnotationRightCorner;
