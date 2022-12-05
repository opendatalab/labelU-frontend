import React, {useState, useEffect} from 'react';
import currentStyles from './index.module.scss'
import {Modal} from "antd";
const OutputData = (props : any)=>{
    let isShowModal = props.isShowModal;
    return (<Modal title = '选择导出格式'
    open = {isShowModal}>
        <div className={currentStyles.outerFrame}>
            <div className = {currentStyles.pattern}>
                <div className = {currentStyles.title}>导出格式</div>
                <div className = {currentStyles.buttons}>
                    <div className = {currentStyles.button}>JSON</div>
                    <div className = {currentStyles.button}>COCO</div>
                    <div className = {currentStyles.button}>MASK</div>
                </div>
            </div>
            <div className={currentStyles.bottom}>Label U 标准格式，包含任务id,标注结果、url、fileName字段</div>
        </div>
    </Modal>)
}
export default OutputData;