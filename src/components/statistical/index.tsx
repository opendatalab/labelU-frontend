import React, { useEffect, useState } from 'react';
import currentStyles from './index.module.scss';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import commonController from '../../utils/common/common';
import { UploadOutlined, SettingOutlined } from '@ant-design/icons'
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

  },[location]);
  const [statisticalDatas, setStatisticalDatas] = useState<any>({});
  useEffect(()=>{
      setStatisticalDatas({
          annotated : 1,
          notAnnotated : 2,
          skip : 1,
          total : 40
      })
  },[])
  return (<div className={currentStyles.outerFrame}>
    <div className = {currentStyles.left}>
      <div className = {currentStyles.leftTitle}><b>数据总览</b>
      </div>
        <div className = {currentStyles.leftTitleContent}>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionBlueIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} >已标注</div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.annotated}</div>
            </div>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionGrayIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} ><b>未标注</b></div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.notAnnotated}</div>
            </div>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionOrangeIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} ><b>跳过</b></div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.skip}</div>
            </div>
            <div className = {currentStyles.leftTitleContentOption}>
                <div className = {currentStyles.leftTitleContentOptionWhiteIcon}></div>
                <div className = {currentStyles.leftTitleContentOptionContent} ><b>总计</b></div>
                <div className = {currentStyles.leftTitleContentOptionContent}>{statisticalDatas.total}</div>
            </div>
        </div>
    </div>
    <div className = {currentStyles.right}>
      <div className = {currentStyles.rightOption1}>                <SettingOutlined />
          &nbsp;&nbsp;任务配置</div>
      <div className = {currentStyles.rightOption2}><UploadOutlined />&nbsp;&nbsp;数据导出</div>
      <div className = {currentStyles.rightOption3}>数据导入</div>
      <div className = {currentStyles.rightOption4}>开始标注</div>
    </div>
  </div>)
}
export  default Statistical;
