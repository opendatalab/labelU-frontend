import React, {useState} from 'react';
import currentStyles from './index.module.scss';
import {Modal, Pagination} from 'antd';
import { useNavigate } from "react-router";
import moment from "moment";
import { Progress } from "antd";
import commonController from '../../utils/common/common'
import { outputSamples } from "../../services/samples";
import {CheckCircleOutlined, UploadOutlined, DeleteOutlined} from '@ant-design/icons'
import { deleteTask } from "../../services/createTask";
import currentStyles1 from "../../pages/outputData/index.module.scss";

const TaskCard = (props : any)=>{
    const { cardInfo } = props;
    const { stats, id, status } = cardInfo;
    // console.log(cardInfo)
    let unDoneSample = stats.new;
    let doneSample = stats.done  + stats.skipped;
    let total = unDoneSample + doneSample;
    const createTask = ()=>{
        alert('createTask')
    }
    const navigate = useNavigate();
    const turnToAnnotation = (e:any)=>{
        e.stopPropagation();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        // navigate('/taskList/task/taskAnnotation');
        navigate('/tasks/'+id);
    }
    let localUserEmail = localStorage.getItem('username');

    const outputDataLocal = (e : any)=>{
        // outputSamples(id)
    }

    const deleteTaskLocal= (e : any)=>{
        // console.log(e);
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        deleteTask(id).then((res:any)=>{
            if(res.status === 200){
                navigate('/tasks?'+new Date().getTime())
            }else{
                commonController.notificationErrorMessage({message : '删除不成功'},100)
            }
        }).catch(e=>commonController.notificationErrorMessage(e,1))
        e.stopPropagation();

    }
    const [activeTxt, setActiveTxt] = useState('JSON');
    const [isShowModal, setIsShowModal] = useState(false);
    const clickOk = (e : any)=>{
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        e.preventDefault();
        setIsShowModal(false);
        outputSamples(id, activeTxt).then(res=>console.log(res)).catch(error=>{commonController.notificationErrorMessage(error, 1)});
    }

    const clickCancel = (e : any)=>{
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        e.preventDefault();
        setIsShowModal(false);
    }
    const confirmActiveTxt = (e : any, value : string)=>{
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        e.preventDefault();
        setActiveTxt(value)
    }
    return (<div className = {currentStyles.outerFrame}
    onClick = {turnToAnnotation}
    >
        <div className={currentStyles.item}>
            <div className={currentStyles.itemLeft}>
            <div className = { currentStyles.itemTaskName }>{cardInfo.name}</div>
            {
                cardInfo.status !== 'DRAFT' &&
                cardInfo.status !== 'IMPORTED'
                &&
                <div className = { currentStyles.mediaType }>
                    <div style = {{ color : '#1b67ff' }}>图片</div>
                </div>
            }
            {
                (cardInfo.status === 'DRAFT' ||
                cardInfo.status === 'IMPORTED') &&
                <div className = { currentStyles.draft }>
                    <div style = {{ color : '#FF8800' }}>草稿</div>
                </div>
            }
            </div>
            <div className = {currentStyles.icons2}>
              <div className = {currentStyles.upload}
              onClick = {(e:any)=>{
                  e.nativeEvent.stopImmediatePropagation();
                  e.stopPropagation();
                  e.preventDefault();
                  setIsShowModal(true)}}
              ><UploadOutlined /></div>
              {localUserEmail === cardInfo.created_by.username && <div
                  onClick={deleteTaskLocal}
                  className = {currentStyles.delete}><DeleteOutlined/></div>}
            </div>
        </div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{cardInfo.created_by?.username}</div>
        <div className={currentStyles.item} style = {{marginTop : '8px'}}>{moment(cardInfo.created_at).format('YYYY-MM-DD HH:MM')}</div>
        {
            ((doneSample === total) &&  status !== 'DRAFT' && status !== 'IMPORTED') && <div className = {currentStyles.item41}>
              <div className = {currentStyles.item41Left}>{total}/{total} </div>
              <div className = {currentStyles.item41Right}><CheckCircleOutlined style ={{color : '#00B365'}}/>&nbsp;已完成</div>
            </div>
        }
        {
            (doneSample !== total && status !== 'DRAFT' && status !== 'IMPORTED') && <div className = {currentStyles.item42}>
            <div className = {currentStyles.item42Left}><Progress percent={Math.trunc(doneSample*100/total)} showInfo = {false}/></div>
            <div className = {currentStyles.item41Left}>&nbsp;&nbsp;{doneSample}/{total} </div>
            </div>
        }
        <Modal title = '选择导出格式'
               okText={'导出'}
               onOk = {clickOk}
               onCancel = {clickCancel}
               open = {isShowModal}>
            <div className={currentStyles1.outerFrame}>
                <div className = {currentStyles1.pattern}>
                    <div className = {currentStyles1.title}>导出格式</div>
                    <div className = {currentStyles1.buttons}>
                        {activeTxt === 'JSON' && <div className = {currentStyles1.buttonActive} onClick = {(e)=>confirmActiveTxt(e,'JSON')}>JSON</div>}
                        {activeTxt !== 'JSON' && <div className = {currentStyles1.button} onClick = {(e)=>confirmActiveTxt(e,'JSON')}>JSON</div>}

                        {activeTxt === 'COCO' && <div className = {currentStyles1.buttonActive} onClick = {(e)=>confirmActiveTxt(e,'COCO')}>COCO</div>}
                        {activeTxt !== 'COCO' && <div className = {currentStyles1.button} onClick = {(e)=>confirmActiveTxt(e,'COCO')}>COCO</div>}

                        {activeTxt === 'MASK' && <div className = {currentStyles1.buttonActive} onClick = {(e)=>confirmActiveTxt(e,'MASK')}>MASK</div>}
                        {activeTxt !== 'MASK' && <div className = {currentStyles1.button} onClick = {(e)=>confirmActiveTxt(e,'MASK')}>MASK</div>}
                    </div>
                </div>
                <div className={currentStyles.bottom}>Label U 标准格式，包含任务id,标注结果、url、fileName字段</div>
            </div>
        </Modal>
    </div>)
}
export  default TaskCard;
