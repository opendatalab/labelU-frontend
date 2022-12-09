import React from 'react';
import currentStyles from './index.module.scss';
import {InfoCircleOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router";

const GoToEditTask = (props : any)=>{
  const {taskStatus} = props;
  const navigate = useNavigate();
  let taskId = parseInt(window.location.pathname.split('/')[2]);
  const turnToEditTask = ()=>{
    let tail = 'basic';
    switch (taskStatus) {
      case 'DRAFT' :
        tail = 'basic';
        break;
      case 'IMPORTED' :
        // tail = 'upload';
        tail = 'config';
        break;
      case 'CONFIGURED' :
        tail = 'config';
      break;
    }
    navigate('/tasks/'+taskId+'/edit/'+tail);
  }
  return (<div className={currentStyles.outerFrame}>
    <InfoCircleOutlined  style = {{color : '#F5483B'}} className = {currentStyles.icon}/>
    <div className={currentStyles.txt}>请先完成任务配置， 再开始标注</div>
    <div className={currentStyles.toConfig} onClick = {turnToEditTask}>去配置</div>
  </div>)
}
export default GoToEditTask;
