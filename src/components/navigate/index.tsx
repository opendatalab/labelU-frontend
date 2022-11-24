import React, { useEffect, useState } from 'react';
import currentStyles from './index.module.scss';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import commonController from '../../utils/common/common'
const Homepage = ()=>{
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
            <div className = {currentStyles.logo}>
            </div>
            <div className = {currentStyles.shortCutButton}></div>
            <div className = {currentStyles.breadcrumb}>
                <Breadcrumb>
                    {breadcrumbItems}
                </Breadcrumb>
            </div>
        </div>
        <div className = {currentStyles.right}>
            {username}
        </div>
    </div>)
}
export  default Homepage;