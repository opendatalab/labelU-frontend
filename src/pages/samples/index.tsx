import React, { useState } from 'react';
import currentStyles from './index.module.scss';
import commonStyles from '../../utils/common/common.module.scss';
import Statistical from '../../components/statistical';
import { Outlet, useNavigate } from "react-router-dom";
import Separator from '../../components/separator';
import { updateTaskConfig } from '../../services/createTask';
import constant from '../../constants';
import {connect, useSelector, useDispatch} from 'react-redux';

import commonController from '../../utils/common/common';

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

  return (<div className={currentStyles.outerFrame}>
    <div className = {currentStyles.stepsRow}>
        <Statistical />
    </div>
    <div className = { currentStyles.content }>
      <Outlet />
    </div>
  </div>)
}

const mapStateToProps = (state : any)=>{
  // console.log(state);
  return state.toolsConfig;
};

const mapDispatchToProps = ()=>{

};

export  default connect(mapStateToProps)(Samples);
