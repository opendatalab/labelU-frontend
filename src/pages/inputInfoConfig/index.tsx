import React from 'react';
import currentStyles from './index.module.scss';
import { Input } from 'antd';
const InputInfoConfig = ()=>{
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
                    <Input placeholder = '请输入50字以内的任务名称'/>
                </div>
            </div>
            <div className = { currentStyles.item}>
                <div className = { currentStyles.itemLabel}>任务描述</div>
                <div className = { currentStyles.itemInput}>
                    <Input.TextArea placeholder = '请输入500字以内的任务描述'
                           autoSize = {{minRows : 6, maxRows : 10}}/>
                </div>
            </div>
            <div className = { currentStyles.item}>
                <div className = { currentStyles.itemLabel}>任务提示</div>
                <div className = { currentStyles.itemInput}>
                    <Input.TextArea placeholder = '请输入1000字以内的标注任务提示，在标注过程中为标注者提供帮助'
                                    autoSize = {{minRows : 6, maxRows : 10}}/>
                </div>

            </div>
        </div>
    </div>)
}
export  default InputInfoConfig;