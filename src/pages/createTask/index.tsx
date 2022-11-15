import React, { useState } from 'react';
import currentStyles from './index.module.scss';
import commonStyles from '../../utils/common/common.module.scss';
import {Breadcrumb, Steps} from 'antd';
import Step from '../../components/step';
import {Link, Outlet } from "react-router-dom";
import Separator from '../../components/separator';
const CreateTask = ()=>{
    const createTask = ()=>{
        alert('createTask')
    }
    const steps = [{
        title : '基础配置',
        index : 1,
        contentUrl : './inputInfoConfig'
    },
        {

            title : '数据导入',
            index : 2,
            contentUrl : './inputData'

        },
        {

            title : '标注配置',
            index : 3,
            contentUrl : './annotationConfig'
        }
        ];
    const [current, setCurrent] = useState(0);
    const next = ()=>{
        setCurrent(current + 1)
    }
    const prev = ()=>{
        setCurrent(current - 1)
    }
    const items = steps.map(item=>({key : item.title, title : item.title}))
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
                <div className={`${commonStyles.commonButton} ${currentStyles.nextButton}`}>
                    下一步
                </div>
            </div>
        </div>
        <div className = { currentStyles.content }>
            <Outlet />
        </div>
    </div>)
}
export  default CreateTask;