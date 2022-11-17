import React, { useState } from 'react';
import currentStyles from "../signUp/index.module.scss";
import {Input} from "antd";
import {Link} from "react-router-dom";
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import CommonController from "../../utils/common/common";
import { signUp } from '../../services/general';
const SignUp = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const changeEmail = (event : any)=>{
      let targetValue = event.target.value;
      let isNull = CommonController.isInputValueNull(event);
      if(!isNull){
        setUsername(targetValue);
      }
    }
    const changePassword = (event : any)=>{
        let targetValue = event.target.value;
        let isNull = CommonController.isInputValueNull(event);
        if(!isNull){
            setPassword(targetValue);
        }
    }

    const register = async function(){
        try {
            let res = await signUp({username,password})
        }catch{

        }
    }
    return (<div className = { currentStyles.outerFrame } >
        <div className = {currentStyles.title} >注册</div>
        <div className = {currentStyles.email_m} >
            <Input
                placeholder = '请输入邮箱'
                prefix = {
                    <IdcardOutlined/>
                }
                onChange = {changeEmail}
                className = {'email'}/>
        </div>

        <div className = {currentStyles.email_m} >
            <Input
                placeholder = '请输入不少于6位数的密码'
                onChange = { changePassword }
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

        <div className = { currentStyles.loginButton }
        onClick = { register }
        >注册</div>
        <div className = { currentStyles.signUpButton }
        >
            已有账号？<Link to = {'/'}>登录</Link></div>
    </div>)
}
export default SignUp;