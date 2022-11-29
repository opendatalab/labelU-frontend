import React, { useState, useEffect } from 'react';
import currentStyles from './index.module.scss';
import commonStyles from '../../utils/common/common.module.scss';
import Statistical from '../../components/statistical';
import { Outlet, useNavigate } from "react-router-dom";
import Separator from '../../components/separator';
import { updateTaskConfig } from '../../services/createTask';
import constant from '../../constants';
import {connect, useSelector, useDispatch} from 'react-redux';

import commonController from '../../utils/common/common';
import { Table, Pagination, Modal } from 'antd';
import { updateConfigStep } from '../../stores/task.store';
const Samples = (props : any)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let configStep = useSelector(state=>state.existTask.configStep );

  const steps = [{
    title : '基础配置',
    index : 1,
    contentUrl : './inputInfoConfig'
  },
    {

      title : '数据导入',
      index : 2,
      contentUrl : './inputData'
    },
    {

      title : '标注配置',
      index : 3,
      contentUrl : './annotationConfig'
    }
  ];
  const [current, setCurrent] = useState(0);
  const next = ()=>{
    setCurrent(current + 1)
  }
  const prev = ()=>{
    setCurrent(current - 1)
  }
  const items = steps.map(item=>({key : item.title, title : item.title}));
  const tempBao = true;
  const finallySave = async function(){
    // console.log(props.toolsConfig);
    let res = await updateTaskConfig(4, {
      name : 'task_test_annotationConfig',
      "description" : '1',
      'tips' : '1',
      'config' : JSON.stringify(props.toolsConfig)
    })
    if(!res) {
      commonController.notificationErrorMessage({message : '配置不成功'}, 1);
      return;
    }else{
      if (res.status === 200) {
        navigate(constant.urlTurnToTaskList);
      }
    }
  }
  const nextStep = ()=>{
    let currentStep = -1;
    let childOutlet = 'inputInfoConfig';
    switch (configStep) {
      case -1 :
        currentStep = 0;
        childOutlet = 'inputData';
        break;
      case 0 :
        currentStep = 1;
        childOutlet = 'annotationConfig';
        break;
    }
    dispatch(updateConfigStep(currentStep));
    navigate(childOutlet);
  }
  const columns = [
    {
      title: '数据ID',
      dataIndex: 'packageID',
      key: 'packageID',
      className : currentStyles.tableColumn
      // width: 80,
    },
    {
      title: '数据预览',
      dataIndex: 'packageID',
      key: 'packageID',
      // width: 80,
    },
    {
      title: '标注情况',
      dataIndex: 'packageID',
      key: 'packageID',
      // width: 80,
    },
    {
      title: '标注数',
      dataIndex: 'packageID',
      key: 'packageID',
      // width: 80,
    },
    {
      title: '标注者',
      dataIndex: 'packageID',
      key: 'packageID',
      // width: 80,
    },
    {
      title: '上次标注时间',
      dataIndex: 'packageID',
      key: 'packageID',
      // width: 80,
    },
    {
      title: '',
      dataIndex: 'option',
      key: 'packageID',
      width: 180,
    }
  ]
  const [showDatas, setShowDatas] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const clickModalOk = ()=>{
    setIsModalShow(false);
  }
  const clickModalCancel = ()=>{
    setIsModalShow(false);
  }
  const rowSelection = {
    onChange : (selectedKeys : any, selectedRows : any)=>{
      console.log({selectedKeys,selectedRows})
    },
        getCheckboxProps: (record: any) => {
      console.log(record);
      return{
        disabled: false, // Column configuration not to be checked
        name: record.packageID,
        key : record.packageID
      }
    },
    selectedKeys : ()=>{

    }
  }
  const turnToAnnotate = ()=>{
    navigate('/tasks/samples')
  }

  useEffect(()=>{
    setShowDatas([{
      option : (<div className={ currentStyles.optionItem }>
        <div className={ currentStyles.optionItemEnter } onClick={ turnToAnnotate }>进入标注</div>
        <div className={ currentStyles.optionItemDelete }>删除</div>
      </div>)
    }])
  },[]);
  return (<div className={currentStyles.outerFrame}>
    <div className = {currentStyles.stepsRow}>
        <Statistical />
    </div>
    <div className = { currentStyles.content }>
      <Table columns = {columns}
             dataSource={showDatas ? showDatas: []}
             pagination={false}
             loading = {dataLoading}
             rowSelection = { rowSelection }
      ></Table>
      <div className = { currentStyles.pagination }>
        <div className = { currentStyles.dataProcess}>
          <div className = { currentStyles.dataProcessDelete } onClick = {()=>{setIsModalShow(true)}}>批量删除</div>
          <div className = { currentStyles.dataProcessOutput }>批量数据导出</div>
        </div>
        <Pagination
            total = {25}
            showSizeChanger
            showQuickJumper
        />
      </div>

    </div>
    <Modal open = {isModalShow} onOk ={clickModalOk} onCancel={clickModalCancel}>
      <p><img src="/src/icons/warning.png" alt=""/>确认要删除这条数据吗？</p>
    </Modal>
  </div>)
}

const mapStateToProps = (state : any)=>{
  return state.toolsConfig;
};

const mapDispatchToProps = ()=>{

};

export  default connect(mapStateToProps)(Samples);
