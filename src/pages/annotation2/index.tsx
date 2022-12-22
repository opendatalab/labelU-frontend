import React, {useState, useEffect, memo, createRef} from 'react';
// import Annotation from '../annotation/index';
import Annotation from '../../components/business/annotation';
import './index.module.scss';
import { getTask, getSample } from '../../services/samples';
import classnames from 'classnames';
import commonController from '../../utils/common/common'
import SlideLoader from "../../components/slideLoader";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentSampleId } from '../../stores/sample.store';
// import otherStore from "../../stores/other";
import currentStyles from './index.module.scss';
import AnnotationRightCorner from "../../components/annotationRightCorner";
import { updateAnnotationDatas } from '../../stores/annotation.store'
import { useLocation } from "react-router";

// import TF from './tF';
export let annotationRef = createRef();

// @ts-ignore
const AnnotationPage = ()=>{
    // console.log(otherStore);
    const location = useLocation();
    // @ts-ignore
    const MemoSlideLoader = memo(SlideLoader);
    let taskId = parseInt(window.location.pathname.split('/')[2]);
    let sampleId = parseInt(window.location.pathname.split('/')[4]);
    // @ts-ignore
    // otherStore.currentSampleId = sampleId;
    // let annotationRef = useSelector(state => state.annotation.annotationDatas)
    const dispatch = useDispatch();
    const [taskConfig, setTaskConfig] = useState<any>({});
    const [taskSample, setTaskSample] = useState<any>([]);
    const getDatas = async function (taskId : number, sampleId : number) {
        // console.trace();
        try{
            let taskRes = await getTask(taskId);
            // @ts-ignore
            if (taskRes.status === 200) {
                // console.log(taskRes);
                // taskRes.data.data.config = {
                //     "tools": [
                //         {
                //             "tool": "rectTool",
                //             "config": {
                //                 "isShowCursor": false,
                //                 "showConfirm": false,
                //                 "skipWhileNoDependencies": false,
                //                 "drawOutsideTarget": false,
                //                 "copyBackwardResult": true,
                //                 "minWidth": 1,
                //                 "attributeConfigurable": true,
                //                 "textConfigurable": true,
                //                 "textCheckType": 4,
                //                 "customFormat": "",
                //                 "attributeList": [
                //                     {
                //                         "key": "rectTool",
                //                         "value": "rectTool"
                //                     }
                //                 ]
                //             }
                //         }
                //     ],
                //     "tagList": [],
                //     "attribute": [
                //         {
                //             "key": "RT",
                //             "value": "RT"
                //         }
                //     ],
                //     "textConfig": [],
                //     "fileInfo": {
                //         "type": "img",
                //         "list": [
                //             {
                //                 "id": 1,
                //                 "url": "/src/img/example/bear4.webp",
                //                 "result": "[]"
                //             }
                //         ]
                //     }
                // }
                // @ts-ignore
                // console.log(taskRes?.data.data.config);
                // @ts-ignore
                setTaskConfig(JSON.parse(taskRes?.data.data.config));
                // setTaskConfig(JSON.parse(taskRes.data.data.config));
            }else{
                commonController.notificationErrorMessage({message : '请求任务出错'}, 1);
                return;
            }
            let sampleRes = await getSample(taskId, sampleId);
            console.log(sampleRes);
            if (sampleRes.status === 200) {
                // console.log(sampleRes);
                let newSample = commonController.transformFileList(sampleRes.data.data.data, sampleRes.data.data.id);
                // console.log(newSample);
                setTaskSample(newSample);
            }else{
                commonController.notificationErrorMessage({message : '请求任务出错'}, 1);
            }
        }catch(err){
            commonController.notificationErrorMessage(err, 1)
        }
    }

    useEffect(()=>{
        // console.log(window.location.pathname)
        let taskId = parseInt(window.location.pathname.split('/')[2]);
        let sampleId = parseInt(window.location.pathname.split('/')[4]);
        getDatas(taskId, sampleId).then(()=>console.log('ok')).catch(err=>console.log(err));
        dispatch(updateCurrentSampleId(sampleId));
    },[ location ]);

  useEffect(()=>{
    console.log('hhhhhhhhhhhhhhhhhh')
    console.log(taskSample);
    // console.trace();
  },[ taskSample ]);

    useEffect(()=>{
        getDatas(taskId, sampleId).then(()=>console.log('ok')).catch(err=>console.log(err));
        dispatch(updateCurrentSampleId(sampleId));
        // dispatch(updateAnnotationDatas(annotationRefNew))
    },[]);
    const goBack = (data: any) => {
        console.log('goBack', data);
    };
    // @ts-ignore
    // const leftSiderContent = <MemoSlideLoader />;
    const leftSiderContent = <SlideLoader />;
    // const leftSiderContent = <div>test</div>;

    // const leftSiderContent = (<div>test1</div>)
    const topActionContent = (<AnnotationRightCorner />)
    // const topActionContent = (<div>2</div>)
    const exportData = (data : any)=>{
        console.log(data)
    }
    const onSubmit = (data : any)=>{
        // console.log(data)
        dispatch(updateAnnotationDatas(data[0].result));

    }

    const testGet = ()=>{
        // @ts-ignore
        console.log(annotationRef?.current?.getResult());
    }

    // const [t, setT] = useState([{name : 1, result : 'aa,bb'}]);


    return <div className={currentStyles.annotationPage}>
      {/*{ t[0].result }*/}
      {/*  <TF t1 = {t} rf = {annotationRef}/>*/}
        {taskSample && taskSample.length > 0 && taskConfig.tools && taskConfig.tools.length > 0 && (
            <Annotation
                leftSiderContent = { leftSiderContent }
                topActionContent = { topActionContent }
                annotationRef = { annotationRef }
                attribute={taskConfig.attribute}
                tagList={taskConfig.tagList}
                fileList={taskSample}
                textConfig={taskConfig.textConfig}
                goBack={goBack}
                tools={taskConfig.tools}
                // exportData = {exportData}
                // onSubmit = {onSubmit}
                commonAttributeConfigurable = {taskConfig.commonAttributeConfigurable}
            />
        )}
    </div>;
}
export default AnnotationPage;
