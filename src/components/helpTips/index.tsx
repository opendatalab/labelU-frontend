import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const HelpTips = (props : any)=>{
    const clickShowModal = ()=>{
        Modal.success({
            title : '标注文档',
            content : props.taskTips
        })
    }

    return (<div onClick = {()=>clickShowModal()}>帮助文档&nbsp;&nbsp;<BellOutlined /></div>)
}
export default HelpTips;
