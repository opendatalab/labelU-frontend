import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const HelpTips = ()=>{
    const clickShowModal = ()=>{
        Modal.success({
            title : '标注文档',
            content : '内容待定'
        })
    }

    return (<div onClick = {()=>clickShowModal()}><BellOutlined />&nbsp;帮助文档</div>)
}
export default HelpTips;