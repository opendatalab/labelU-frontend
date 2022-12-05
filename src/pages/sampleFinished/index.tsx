import React, {useEffect, useState} from 'react';
import currentStyles from './index.module.scss';
import { CheckOutlined } from '@ant-design/icons';
import {getTask, outputSamples} from "../../services/samples";
import commonController from '../../utils/common/common'
import {useNavigate} from "react-router";
const SamplesFinished = ()=>{
  const [stat,setStat] = useState<any>({})
  let taskId = parseInt(window.location.pathname.split('/')[2]);

  useEffect(()=>{
    getTask(taskId).then(res=>{
      if(res.status === 200){
        setStat(res.data.data.stats);
      }else{
        commonController.notificationErrorMessage({message : '向服务端请求任务数据出错'},1)
      }
    }).catch(error=>{
      commonController.notificationErrorMessage(error, 1);
    })
  },[])
  const navigate = useNavigate();
  const turnToSamples = ()=>{
    let currentPathnames = window.location.pathname.split('/');
    currentPathnames.splice(3,2);
    navigate( currentPathnames.join('/'));
  }

  const outputSamplesLocal = ()=>{
    outputSamples(taskId).then(res=>console.log(res)).catch(error=>{commonController.notificationErrorMessage(error, 1)});
  }

  return (<div className={currentStyles.outerFrame}>
    <div className={currentStyles.check}><CheckOutlined style = {{color : '#64ba64',
      fontSize : '40px'}} /></div>
    <div className={currentStyles.txt}>标注完成</div>
    <div className={currentStyles.stat}>
      <div className={currentStyles.statItem}>已标注： {stat.done},</div>
      <div className={currentStyles.statItem}>未标注： <div style={{color:'red'}}>{stat.new}</div>,</div>
      <div className={currentStyles.statItem}>跳过：{stat.skipped}</div>
    </div>
    <div className={currentStyles.buttons}>
      <div className={currentStyles.buttons1}
      onClick={commonController.debounce(outputSamplesLocal, 100)}
      >导出数据</div>
      <div className={currentStyles.buttons2} onClick={turnToSamples}>返回主页</div>
    </div>
  </div>)
}

export default SamplesFinished;
