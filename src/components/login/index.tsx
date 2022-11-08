import React from 'react';
import currentStyles from './index.module.scss';
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import {Input} from "antd";
import { Link } from 'react-router-dom'
const Login = (props : any)=>{
    const { turnToSignUp } = props;
    console.log(turnToSignUp)
    return (<div className = { currentStyles.outerFrame } >
        <div className = {currentStyles.title} >登录</div>
        <div className = {currentStyles.email_m} >
            <Input
            placeholder = '邮箱'
            prefix = {
                <IdcardOutlined/>
            }
            className = {'email'}/>
        </div>

        <div className = {currentStyles.email_m} >
            <Input
                placeholder = '密码'
                prefix = {
                    <LockOutlined/>
                }/>
        </div>

        <div className = { currentStyles.loginButton }>登录</div>
        <div className = { currentStyles.signUpButton }
        >
            <Link to = {turnToSignUp}>注册</Link></div>
    </div>)
}
export default Login;