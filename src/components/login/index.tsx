import React, { useState  } from 'react';
import currentStyles from './index.module.scss';
import commonStyles from '../../utils/common/common.module.scss';
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import {Input} from "antd";
import { Link } from 'react-router-dom'
import CommonController from "../../utils/common/common";
import { login as loginService } from '../../services/general';
import { useNavigate } from 'react-router-dom';
const Login = (props : any)=>{
    const { turnToSignUp, turnToTaskList } = props;
    const [checkMessage, setCheckMessage] = useState<any>({});
    const [ email, setEmail ] = useState<any>(null);
    const [ password, setPassword ] = useState<any>(null);
    const navigate = useNavigate();
    const changeEmail = (event:any)=>{
        let target = event.target.value;
        if(target !== undefined){
            target = target.trim();
            setEmail( target );
        }
    }
    const changePassword = (event : any)=>{
        let target = event.target.value;
        if(target !== undefined){
            target = target.trim();
            setPassword( target );
        }
    }
    const loginController = async function (){
        try{
            let hasUndefined = CommonController.checkObjectHasUndefined({
                username : email,
                password
            });
            if (hasUndefined.tag) {
                CommonController.notificationErrorMessage({msg : '请填写'+ hasUndefined.key}, 5);
                return;
            }
            let token = await loginService({
                username : email,
                password
            });
            localStorage.setItem('token', token);
            navigate( turnToTaskList );
        }catch(error){

        }


    }
    return (<div className = { currentStyles.outerFrame } >
        <div className = {currentStyles.title} >登录</div>
        <div className = {currentStyles.email_m} >
            <Input
            placeholder = '邮箱'
            onChange = {changeEmail}
            prefix = {
                <IdcardOutlined/>
            }
            className = {'email'}/>
            <div className = {commonStyles.loginAndSignUpNotice}>
                { checkMessage.email }
            </div>
        </div>

        <div className = {currentStyles.email_m} >
            <Input
                placeholder = '密码'
                onChange = { changePassword }
                prefix = {
                    <LockOutlined/>
                }/>
            <div className = {commonStyles.loginAndSignUpNotice}>
                { checkMessage.password }
            </div>
        </div>

        <div className = { currentStyles.loginButton }
        onClick = {loginController}
        >登录</div>
        <div className = { currentStyles.signUpButton }
        >
            <Link to = {turnToSignUp}>注册</Link></div>
    </div>)
}
export default Login;