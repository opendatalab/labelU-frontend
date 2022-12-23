import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import currentStyles from './index.module.scss';
const HelpTips = (props : any)=>{
    const clickShowModal = ()=>{
        Modal.success({
            title : '标注文档',
            content : props.taskTips
        })
    }

    return (<div onClick = {()=>clickShowModal()} className={currentStyles.outerFrame}>帮助文档&nbsp;&nbsp;<img src = '/src/icons/helpText.svg' /></div>)
}
export default HelpTips;
