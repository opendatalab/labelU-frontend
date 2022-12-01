import React, { useState } from 'react';
import currentStyles from './index.module.scss';
import commonStyles from '../../utils/common/common.module.scss';
import {Breadcrumb, Steps} from 'antd';
import Step from '../../components/step';
import {Link, Outlet, useNavigate } from "react-router-dom";
import Separator from '../../components/separator';
import {submitBasicConfig, updateTaskConfig} from '../../services/createTask';
import constant from '../../constants';
import {connect, useSelector, useDispatch} from 'react-redux';
import { updateHaveConfigedStep } from '../../stores/task.store'
import commonController from '../../utils/common/common';

import { updateConfigStep, updateTaskId } from '../../stores/task.store';
import { createSamples } from '../../services/samples';

const CreateTask = (props : any)=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let configStep = useSelector(state=>state.existTask.configStep );
    let haveConfigedStep =  useSelector(state=>state.existTask.haveConfigedStep );
    let taskName = useSelector(state=>state.existTask.taskName );
    let taskDescription = useSelector(state=>state.existTask.taskDescription );
    let taskTips = useSelector(state=>state.existTask.taskTips );
    let taskId = useSelector(state=>state.existTask.taskId );

    let newSamples = useSelector(state=>state.samples.newSamples);
    const steps = [{
        title : '基础配置',
        index : 1,
        contentUrl : `/tasks/${taskId}/edit/basic`
    },
        {

            title : '数据导入',
            index : 2,
            contentUrl : `/tasks/${taskId}/edit/upload`

        },
        {

            title : '标注配置',
            index : 3,
            contentUrl : `/tasks/${taskId}/edit/config`
        }
        ];
    const [current, setCurrent] = useState(0);
    const next = ()=>{
        setCurrent(current + 1)
    }
    const prev = ()=>{
        setCurrent(current - 1)
    }
    const items = steps.map(item=>({key : item.title, title : item.title}));
    const tempBao = true;
    const finallySave = async function(){
        // console.log(props.toolsConfig);
        let res = await updateTaskConfig(taskId, {
            'config' : JSON.stringify(props.toolsConfig)
        })
        if(!res) {
            commonController.notificationErrorMessage({message : '配置不成功'}, 1);
            return;
        }else{
            if (res.status === 200) {
                navigate(constant.urlTurnToTaskList);
            }
        }
    }

    const updateStep = (status : string)=>{
        let result = 0;
        switch(status){
            case 'DRAFT' :
                result = 1;
                break;
            case 'IMPORTED' :
                result = 2;
                break;
            default :
                result = 3;
                break;
        }
        dispatch(updateHaveConfigedStep(result));
    }
    const updateTaskIdLocal = (id : number)=>{
        dispatch(updateTaskId(id))
    }
    const nextWhen0= async function(){
        let result = true;
        if (!taskName) {
            commonController.notificationErrorMessage({message : '请填入任务名称'}, 1);
            return false;
        }
        try{
            let res : any= await submitBasicConfig({name : taskName,
                description : taskDescription,
                tips : taskTips
            })
            if (res.status === 201) {
                const { status, id } = res.data.data;
                updateStep(status);
                updateTaskIdLocal(id);
            }else{
                result = false;
                commonController.notificationErrorMessage(res.data,1);
            }
        }catch(error){
            result = false;
            commonController.notificationErrorMessage(error, 1);
        }
        return result;
    }
    const nextWhen1 = async function(){
        let result = true;
        if (newSamples.length === 0) {
            commonController.notificationWarnMessage({message : '请导入数据,再进行下一步操作'}, 1);
            return false;
        }
        try{
            let res : any= await createSamples(taskId,newSamples)
            if (res.status === 201) {
                // const { status, id } = res.data.data;
                updateStep('IMPORTED');
                // updateTaskIdLocal(id);
            }else{
                result = false;
                commonController.notificationErrorMessage(res.data,1);
            }
        }catch(error){
            result = false;
            commonController.notificationErrorMessage(error, 1);
        }
        return result;
    }
    const nextStep = async function(){
        console.log(configStep);
        console.log(taskId);
        let currentStep = -1;
        let childOutlet = `/tasks/${taskId}/edit/basic`;
        switch (configStep) {
            case -1 :
                let isSuccess0 = await nextWhen0();
                if (!isSuccess0) return;
                currentStep = 0;
                childOutlet = `/tasks/${taskId}/edit/upload`;
                break;
            case 0 :
                let isSuccess1 = await nextWhen1();
                if (!isSuccess1) return;
                currentStep = 1;
                childOutlet = `/tasks/${taskId}/edit/config`;
                break;
        }
        dispatch(updateConfigStep(currentStep));
        console.log(childOutlet)
        navigate(childOutlet);
    }

    return (<div className={currentStyles.outerFrame}>
        <div className = {currentStyles.stepsRow}>
            <div className = {currentStyles.left}>
                {steps.map((step : any, stepIndex : number)=>{
                    if (stepIndex === steps.length - 1) {
                        return (<Step ordinalNumber = {step.index} title = {step.title}
                        contentUrl = {step.contentUrl}/>)
                    }else{
                        return (
                            <React.Fragment>
                                <Step ordinalNumber = {step.index} title = {step.title}
                                      contentUrl = {step.contentUrl}/>
                                <Separator />
                            </React.Fragment>)
                    }
                })}
            </div>
            <div className = {currentStyles.right}>
                <div className = {`${commonStyles.cancelButton}  ${currentStyles.cancelButton}`}>
                    取消
                </div>
                {configStep !== 1 && <div className={`${commonStyles.commonButton} ${currentStyles.nextButton}`}
                onClick = { commonController.debounce(nextStep, 100) }
                >
                    下一步
                </div>}
                {configStep === 1 && <div className={`${commonStyles.commonButton} ${currentStyles.nextButton}`}
                onClick = { commonController.debounce(finallySave,200) }
                >
                    保存
                </div>}
            </div>
        </div>
        <div className = { currentStyles.content }>
            <Outlet />
        </div>
    </div>)
}

const mapStateToProps = (state : any)=>{
    // console.log(state);
    return state.toolsConfig;
};

const mapDispatchToProps = ()=>{

};

export  default connect(mapStateToProps)(CreateTask);
