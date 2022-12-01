import React, {useState, useEffect} from 'react';
// import Annotation from '../annotation/index';
import Annotation from '../../components/business/annotation';
import './index.module.scss';
import { getTask, getSample } from '../../services/samples';
import classnames from 'classnames';
import commonController from '../../utils/common/common'
import AnnotationOperation from "@label-u/components";
const AnnotationPage = ()=>{
    let taskId = parseInt(window.location.pathname.split('/')[2]);
    let sampleId = parseInt(window.location.pathname.split('/')[4]);
    let imgList = [
        {
            id: 1,
            url: "http://localhost:8000/api/v1/tasks/attachment/upload/7/59bf7e17-test1.txt",
            result: JSON.stringify([]),
        },
        {
            id: 2,
            url: "http://localhost:8000/api/v1/tasks/attachment/upload/7/59bf7e17-test1.txt",
            result: JSON.stringify([]),
        },
        {
            id: 2,
            url: "http://localhost:8000/api/v1/tasks/attachment/upload/7/59bf7e17-test1.txt",
            result: JSON.stringify([]),
        }
    ];
    const [taskConfig, setTaskConfig] = useState<any>({});
    const [taskSample, setTaskSample] = useState<any>([]);
    const getDatas = async function () {
        try{
            let taskRes = await getTask(taskId);
            if (taskRes.status === 200) {
                console.log(taskRes);
                taskRes.data.data.config = {
                    "tools": [
                        {
                            "tool": "rectTool",
                            "config": {
                                "isShowCursor": false,
                                "showConfirm": false,
                                "skipWhileNoDependencies": false,
                                "drawOutsideTarget": false,
                                "copyBackwardResult": true,
                                "minWidth": 1,
                                "attributeConfigurable": true,
                                "textConfigurable": true,
                                "textCheckType": 4,
                                "customFormat": "",
                                "attributeList": [
                                    {
                                        "key": "rectTool",
                                        "value": "rectTool"
                                    }
                                ]
                            }
                        }
                    ],
                    "tagList": [],
                    "attribute": [
                        {
                            "key": "RT",
                            "value": "RT"
                        }
                    ],
                    "textConfig": [],
                    "fileInfo": {
                        "type": "img",
                        "list": [
                            {
                                "id": 1,
                                "url": "/src/img/example/bear4.webp",
                                "result": "[]"
                            }
                        ]
                    }
                }
                console.log(taskRes.data.data.config);
                setTaskConfig(taskRes.data.data.config);
                // setTaskConfig(JSON.parse(taskRes.data.data.config));
            }else{
                commonController.notificationErrorMessage({message : '请求任务出错'}, 1);
                return;
            }
            let sampleRes = await getSample(taskId, sampleId);
            if (sampleRes.status === 200) {
                console.log(sampleRes);
                let newSample = commonController.transformFileList(sampleRes.data.data.data, sampleRes.data.data.id);
                console.log(newSample);
                setTaskSample(newSample);
            }else{
                commonController.notificationErrorMessage({message : '请求任务出错'}, 1);
            }
        }catch(err){
            commonController.notificationErrorMessage(err, 1)
        }
    }
    useEffect(()=>{
        getDatas().then(()=>console.log('ok')).catch(err=>console.log(err));
    },[]);
    const goBack = (data: any) => {
        console.log('goBack', data);
    };
    const leftSiderContent = (<div>leftSiderContent</div>)
    const topActionContent = (<div>下一步</div>)
    const exportData = (data : any)=>{
        console.log(data)
    }
    const onSubmit = (data : any)=>{
        console.log(data)
    }
    return <>
        {taskSample && taskSample.length > 0 && taskConfig.tools && taskConfig.tools.length > 0 && (
            <Annotation
                leftSiderContent = { leftSiderContent }
                topActionContent = { topActionContent }

                attribute={taskConfig.attribute}
                tagList={taskConfig.tagList}
                fileList={taskSample}
                textConfig={taskConfig.textConfig}
                goBack={goBack}
                tools={taskConfig.tools}
                exportData = {exportData}
                onSubmit = {onSubmit}
            />
        )}
    </>;
}
export default AnnotationPage;