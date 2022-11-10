import React from 'react';
import currentStyles from './index.module.scss';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Homepage = ()=>{
    return (<div className={currentStyles.outerFrame}>
        <div className = {currentStyles.left}>
            <div className = {currentStyles.logo}>
            </div>
            <div className = {currentStyles.shortCutButton}></div>
            <div className = {currentStyles.breadcrumb}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to = '/taskList'>任务列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to = '/taskList/createTask'>新建任务</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
        <div className = {currentStyles.right}>
            李四
        </div>
    </div>)
}
export  default Homepage;