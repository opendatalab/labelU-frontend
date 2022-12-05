import React, {useEffect, useState} from 'react';
import currentStyles from './index.module.scss';
import { Input } from 'antd';
import { submitBasicConfig } from '../../services/createTask';
import CommonController from "../../utils/common/common";
import { useSelector, useDispatch } from 'react-redux';
import {
  updateConfigStep,
  updateHaveConfigedStep,
  updateTask,
  updateTaskDescription,
  updateTaskName,
  updateTaskTips
} from '../../stores/task.store';
import {getTask} from "../../services/samples";
import {updateAllConfig} from "../../stores/toolConfig.store";
import commonController from "../../utils/common/common";
const InputInfoConfig = ()=>{
    const dispatch = useDispatch();
    // const [taskName, setTaskName] = useState('');
    let taskName = useSelector(state => state.existTask.taskName);
    // const [taskDescription, setTaskDescription] = useState('');
    let taskDescription = useSelector(state => state.existTask.taskDescription);

    // const [taskTips, setTaskTips] = useState('');
    let taskTips = useSelector(state => state.existTask.taskTips);
    const [isErrorShow, setIsErrorShow] = useState(false);
    const changeTaskNamme = (event : any)=>{
        let targetValue = event.target.value;
        let isNull = CommonController.isInputValueNull(targetValue);
        if(!isNull){
            dispatch(updateTaskName(targetValue));
            setIsErrorShow(false);
            // setTaskDescription(targetValue);
        }else{
            setIsErrorShow(true);
        }
    }
    const changeTaskDescription = (event : any)=>{
        let targetValue = event.target.value;
        let isNull = CommonController.isInputValueNull(targetValue);
        if(!isNull){
            dispatch(updateTaskDescription(targetValue));
        }
    }
    const changeTaskTips = (event : any)=>{
        let targetValue = event.target.value;
        let isNull = CommonController.isInputValueNull(targetValue);
        if(!isNull){
            dispatch(updateTaskTips(targetValue));
        }
    }
  // useEffect(()=>{
  //   let taskId = parseInt(window.location.pathname.split('/')[2]);
  //
  //   if(taskId > 0) {
  //     getTask(taskId).then((res:any)=>{
  //       if (res.status === 200) {
  //         console.log(res.data.data);
  //         dispatch(updateTask(res.data.data));
  //         if (res.data.data.config){
  //           dispatch(updateAllConfig(JSON.parse(res.data.data.config)));
  //         }
  //       }else{
  //         commonController.notificationErrorMessage({message : '请求任务状态不是200'},1)
  //       }
  //     }).catch(error=>commonController.notificationErrorMessage(error,1))
  //   }
  // },[]);

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
    console.log({taskName})

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
                  {<Input placeholder = '请输入50字以内的任务名称' onChange = {changeTaskNamme} defaultValue = {taskName}
                  // value = { taskName }
                  />}
                  {/*{!taskName && <Input placeholder = '请输入50字以内的任务名称' onChange = {changeTaskNamme}/>}*/}
                    {isErrorShow && <div style = {{color : "red"}}>请输入内容</div>}
                </div>
            </div>
            <div className = { currentStyles.item}>
                <div className = { currentStyles.itemLabel}>任务描述</div>
                <div className = { currentStyles.itemInput}>
                  <Input.TextArea placeholder = '请输入500字以内的任务描述'
                                    onChange = { changeTaskDescription }
                           autoSize = {{minRows : 6, maxRows : 10}}
                  defaultValue = {taskDescription}
                                    // value = {taskDescription}
                  />
                </div>
            </div>
            <div className = { currentStyles.item}>
                <div className = { currentStyles.itemLabel}>任务提示</div>
                <div className = { currentStyles.itemInput}>
                  <Input.TextArea placeholder = '请输入1000字以内的标注任务提示，在标注过程中为标注者提供帮助'
                                    onChange = { changeTaskTips }
                                    autoSize = {{minRows : 6, maxRows : 10}}
                  defaultValue ={ taskTips}
                                  // value = {taskTips}
                  />
                </div>

            </div>
        </div>

        {/*<div onClick = {tijiao}>*/}
        {/*    提交*/}
        {/*</div>*/}
    </div>)
}
export  default InputInfoConfig;
