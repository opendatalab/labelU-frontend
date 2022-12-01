import React, { useEffect, useState } from 'react';
import currentStyles from './index.module.scss';
import commonController from '../../utils/common/common';
import { UploadOutlined, SettingOutlined } from '@ant-design/icons'
import {getTask} from "../../services/samples";
const Statistical = ()=>{

  const [statisticalDatas, setStatisticalDatas] = useState<any>({});
  useEffect(()=>{
      let taskId = parseInt(window.location.pathname.split('/')[2]);
      getTask(taskId).then((res)=>{
          if(res.status === 200){
              setStatisticalDatas(res.data.data.stats);
          }else{
              commonController.notificationErrorMessage({message : '请求任务数据出错'},1);
          }
      }).catch((error)=>{
          commonController.notificationErrorMessage(error, 1);
      });
  },[])
  return (<div className={currentStyles.outerFrame}>
    <div className = {currentStyles.left}>
      <div className = {currentStyles.leftTitle}><b>数据总览</b>
      </div>
        <div className = {currentStyles.leftTitleContent}>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionBlueIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} ><b>已标注</b></div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.done}</div>
            </div>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionGrayIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} ><b>未标注</b></div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.new}</div>
            </div>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionOrangeIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} ><b>跳过</b></div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.skipped}</div>
            </div>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionWhiteIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} ><b>总计</b></div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.done + statisticalDatas.new
                + statisticalDatas.skipped}</div>
            </div>
        </div>
    </div>
    <div className = {currentStyles.right}>
      <div className = {currentStyles.rightOption1}>                <SettingOutlined />
          &nbsp;&nbsp;任务配置</div>
      <div className = {currentStyles.rightOption2}><UploadOutlined />&nbsp;&nbsp;数据导出</div>
      <div className = {currentStyles.rightOption3}>数据导入</div>
      <div className = {currentStyles.rightOption4}>开始标注</div>
    </div>
  </div>)
}
export  default Statistical;
