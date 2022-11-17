import React, { useState } from 'react';
import currentStyles from './index.module.scss';
import { Input } from 'antd';
import { submitBasicConfig } from '../../services/createTask';
import CommonController from "../../utils/common/common";

const InputInfoConfig = ()=>{
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskTips, setTaskTips] = useState('');
    const changeTaskNamme = (event : any)=>{
        let targetValue = event.target.value;
        let isNull = CommonController.isInputValueNull(targetValue);
        if(!isNull){
            setTaskDescription(targetValue);
        }
    }
    const changeTaskDescription = (event : any)=>{
        let targetValue = event.target.value;
        let isNull = CommonController.isInputValueNull(targetValue);
        if(!isNull){
            setTaskName(targetValue);
        }
    }
    const changeTaskTips = (event : any)=>{
        let targetValue = event.target.value;
        let isNull = CommonController.isInputValueNull(targetValue);
        if(!isNull){
            setTaskTips(targetValue);
        }
    }

    const tijiao = async function(){
        try{
            let res : any= submitBasicConfig({name : taskName,
                description : taskDescription,
                tips : taskTips
            })
            alert(res.id);
        }catch(error){
        }
    }

    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.title}>
            <div className={currentStyles.icon}></div>
            <div className = {currentStyles.titleText}>基础配置</div>
        </div>
        <div className = {currentStyles.content}>
            <div className = { currentStyles.item}>
                <div className = { currentStyles.itemLabel}>
                    <div style = {{color : 'red', width : '8px'}}>*</div>
                    任务名称</div>
                <div className = { currentStyles.itemInput}>
                    <Input placeholder = '请输入50字以内的任务名称' onChange = {changeTaskNamme}/>
                </div>
            </div>
            <div className = { currentStyles.item}>
                <div className = { currentStyles.itemLabel}>任务描述</div>
                <div className = { currentStyles.itemInput}>
                    <Input.TextArea placeholder = '请输入500字以内的任务描述'
                                    onChange = { changeTaskDescription }
                           autoSize = {{minRows : 6, maxRows : 10}}/>
                </div>
            </div>
            <div className = { currentStyles.item}>
                <div className = { currentStyles.itemLabel}>任务提示</div>
                <div className = { currentStyles.itemInput}>
                    <Input.TextArea placeholder = '请输入1000字以内的标注任务提示，在标注过程中为标注者提供帮助'
                                    onChange = { changeTaskTips }
                                    autoSize = {{minRows : 6, maxRows : 10}}/>
                </div>

            </div>
        </div>

        <div onClick = {tijiao}>
            提交
        </div>
    </div>)
}
export  default InputInfoConfig;