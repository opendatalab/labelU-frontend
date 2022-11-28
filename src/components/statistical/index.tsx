import React, { useEffect, useState } from 'react';
import currentStyles from './index.module.scss';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import commonController from '../../utils/common/common'
const Statistical = ()=>{
  const username = useSelector(commonController.getUsername);
  let location  = useLocation();
  const crumbs  : any = {
    '/taskList' : (<Breadcrumb.Item>
      <Link to = '/taskList'>任务列表</Link>
    </Breadcrumb.Item>),
    '/taskList/nullTask' : (
      <React.Fragment>
        <Breadcrumb.Item>
          <Link to = '/taskList'>任务列表</Link>
        </Breadcrumb.Item>
      </React.Fragment>
    ),
    '/taskList/task/taskAnnotation' : (
      <React.Fragment>
        <Breadcrumb.Item>
          <Link to = '/taskList'>任务列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to = '/taskList/task'>任务</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          开始标注
        </Breadcrumb.Item>
      </React.Fragment>
    ),
    '/taskList/createTask' : (
      <React.Fragment>
        <Breadcrumb.Item>
          <Link to = '/taskList'>任务列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          新建任务
        </Breadcrumb.Item>
      </React.Fragment>
    ),
    '/taskList/createTask/inputInfoConfig' : (
      <React.Fragment>
        <Breadcrumb.Item>
          <Link to = '/taskList'>任务列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          新建任务
        </Breadcrumb.Item>
      </React.Fragment>
    ),
    '/taskList/createTask/inputData' : (
      <React.Fragment>
        <Breadcrumb.Item>
          <Link to = '/taskList'>任务列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          新建任务
        </Breadcrumb.Item>
      </React.Fragment>
    ),
    '/taskList/createTask/annotationConfig' : (
      <React.Fragment>
        <Breadcrumb.Item>
          <Link to = '/taskList'>任务列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          新建任务
        </Breadcrumb.Item>
      </React.Fragment>
    )
  }
  const [breadcrumbItems, setBreadcrumbItems] = useState<any>((<Breadcrumb.Item>
    <Link to = '/taskList'>任务列表</Link>
  </Breadcrumb.Item>));
  useEffect(()=>{
    if (location.pathname) {
      setBreadcrumbItems(crumbs[location.pathname])
    }else{
      commonController.notificationErrorMessage({message : '地址不正确'}, 1)
    }

  },[location])
  return (<div className={currentStyles.outerFrame}>
    <div className = {currentStyles.left}>
      <div>数据总揽
      </div>
      <div>已标注</div>
      <div>未标注</div>
      <div>跳过</div>
      <div>总计</div>
    </div>
    <div className = {currentStyles.right}>
      <div>任务配置</div>
      <div>数据导出</div>
      <div>数据导入</div>
      <div>开始标注</div>
    </div>
  </div>)
}
export  default Statistical;
