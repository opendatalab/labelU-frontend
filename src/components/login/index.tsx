import React, { useState, useEffect  } from 'react';
import currentStyles from './index.module.scss';
import commonStyles from '../../utils/common/common.module.scss';
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import {Input} from "antd";
import { Link } from 'react-router-dom'
import CommonController from "../../utils/common/common";
import { login as loginService } from '../../services/general';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../stores/user.store';
import intl from 'react-intl-universal';
import enUS1 from '../../locales/en-US';
import zhCN1 from '../../locales/zh-CN';
const Login = (props : any)=>{
    const { turnToSignUp, turnToTaskList } = props;
    const [checkMessage, setCheckMessage] = useState<any>({});
    const [ email, setEmail ] = useState<any>(null);
    const [ password, setPassword ] = useState<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                CommonController.notificationErrorMessage({msg : hasUndefined.key}, 5);
                return;
            }
            let checkUsername = CommonController.checkEmail(undefined, email);
            if(!checkUsername){
                return;
            }
            let checkPassword = CommonController.checkPassword(undefined, password);
            if(!checkPassword){
                return;
            }
            let res = await loginService({
                username : email,
                password
            });
            if (res.status !== 200) {
                CommonController.notificationErrorMessage(res.data,5);
                return;
            }
            let token = res.data.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('username',email)
            dispatch(setUsername(email));
            navigate( turnToTaskList );
        }catch(error){
            CommonController.notificationErrorMessage(error, 1);
        }


    }

    if ((navigator.language.indexOf('zh-CN') > -1)) {
        intl.init({
            currentLocale : 'zh-CN',
            locales : {
                'en-US' : enUS1,
                'zh-CN' : zhCN1
            }
        })
    }else{
        intl.init({
            currentLocale : 'en-US',
            locales : {
                'en-US' : enUS1,
                'zh-CN' : zhCN1
            }
        })
    }

    // let loginText = ()=>intl.get('login123');
    useEffect(()=>{
      console.log(navigator.language);
      // @ts-ignore
      console.log(navigator?.browserLanguage);
      // intl.load({
      //     'zh-CN' : zhCN1,
      //     'en-US': enUS1
      // });


    },[]);

    return (<div className = { currentStyles.outerFrame } >
        {/*<div className = {currentStyles.title} >登录</div>*/}
        {/*<div className = {currentStyles.title} >{loginText()}</div>*/}
        <div className = {currentStyles.title} >{intl.get('login123')}</div>
        <div className = {currentStyles.email_m} >
            <Input
            placeholder = {intl.get('email')}
            onChange = {changeEmail}
            prefix = {
                // <IdcardOutlined/>
              <img src="/src/icons/email.svg" alt=""/>
            }
            className = {'email'}
            onBlur = {CommonController.debounce(CommonController.checkEmail, 500)}
            // onPressEnter = {CommonController.debounce(CommonController.checkEmail, 1000)}
            />
            <div className = {commonStyles.loginAndSignUpNotice}>
                { checkMessage.email }
            </div>
        </div>

        <div className = {currentStyles.email_m} >
            <Input.Password
                placeholder = {intl.get('password')}
                onChange = { changePassword }
                prefix = {
                    // <LockOutlined/>
                  <img src="/src/icons/password.svg" alt=""/>
                }
                visibilityToggle = {false}
                onBlur = {CommonController.debounce(CommonController.checkPassword, 500)}
            />
            <div className = {commonStyles.loginAndSignUpNotice}>
                { checkMessage.password }
            </div>
        </div>

        <div className = { currentStyles.loginButton }
        onClick = {CommonController.debounce(loginController, 500)}
        >{intl.get('login123')}</div>
        <div className = { currentStyles.signUpButton }
        >
            <Link to = {turnToSignUp}>{intl.get('signUp')}</Link></div>
    </div>)
}
export default Login;
