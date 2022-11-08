import React from 'react';
import currentStyles from "../signUp/index.module.scss";
import {Input} from "antd";
import {Link} from "react-router-dom";
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';

const SignUp = ()=>{
    return (<div className = { currentStyles.outerFrame } >
        <div className = {currentStyles.title} >注册</div>
        <div className = {currentStyles.email_m} >
            <Input
                placeholder = '请输入邮箱'
                prefix = {
                    <IdcardOutlined/>
                }
                className = {'email'}/>
        </div>

        <div className = {currentStyles.email_m} >
            <Input
                placeholder = '请输入不少于6位数的密码'
                prefix = {
                    <LockOutlined/>
                }/>
        </div>

        <div className = {currentStyles.email_m} >
            <Input
                placeholder = '请再次输入不少于6位数的密码'
                prefix = {
                    <LockOutlined/>
                }/>
        </div>

        <div className = { currentStyles.loginButton }>注册</div>
        <div className = { currentStyles.signUpButton }
        >
            已有账号？<Link to = {'/'}>登录</Link></div>
    </div>)
}
export default SignUp;