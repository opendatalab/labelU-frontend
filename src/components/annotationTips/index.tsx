import React, { useState, useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
const  AnnotationTips = ()=>{
    const [isShowModal, setIsShowModal] = useState(false);
    const clickShowModal = ()=>{
        Modal.success({
            title : '标注提示',
            content : '内容待定'
        })
    }
    return (<div onClick = {()=>clickShowModal()}>标注提示&nbsp;<QuestionCircleOutlined />

    </div>)
}
export default AnnotationTips;