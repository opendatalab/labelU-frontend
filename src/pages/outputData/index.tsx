import React, {useState, useEffect} from 'react';
import currentStyles from './index.module.scss'
import {Modal} from "antd";
const OutputData = ()=>{
    const [isShowModal, setIsShowModal] = useState(false)
    return (<Modal title = '选择导出格式'>
        <div>
            <div>
                <div>导出格式</div>
                <div>
                    <div>JSON</div>
                    <div>COCO</div>
                    <div>MASK</div>
                </div>
            </div>
            <div>Label U 标准格式，包含任务id,标注结果、</div>
        </div>
    </Modal>)
}
export default OutputData;