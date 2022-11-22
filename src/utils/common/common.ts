import { message } from 'antd';
import { ErrorMessages } from '../../services/errorMessage';
const CommonController = {
  checkLoginAndSignUp (params : any) {

  },
  checkEmail (event : any, emailValue ?: any) {
    let email : any = event ? event.target.value : emailValue;
    // console.log(email)
    let result = false;
    if (email !== undefined
        && (email.indexOf('@') > -1 && email.indexOf('@') === email.lastIndexOf('@') ) ) {
      result = true;
    }
    if(!result) {
      CommonController.notificationErrorMessage({msg : '请填写正确的邮箱'},2);
    }
    return result;
  },
  checkPassword (event : any, passwordValue? : any) {
    let password : any = event ? event.target.value : passwordValue;
    let result = false;
    if (password !== undefined
        && (password.length >=6 && password.length <=18) ) {
      result = true;
    }
    if(!result) {
      CommonController.notificationErrorMessage({self : true, msg : '请填写6-18字符密码'},2);
    }
    return result;
  },
  isEmail (value : string) {
    let result = false;
    let index = value.indexOf('@');
    if(index > -1 && value.lastIndexOf('@') === index) {
      result = true;
    }
    return result;
  },
  isPassword (value : string) {
    return value.length >= 6;
  },
  isInputValueNull (targetValue : any) {
    let result = true;
    if (targetValue || !targetValue.trim()) {
      result = false;
    }
    return result;
  }
  ,
  checkObjectHasUndefined (obj : any) {
    let result : any = {tag : false};
    for (let key in obj) {
      if ((!obj[key] || obj[key] === undefined) && obj[key] !== 0) {
        result.tag = true;
        switch(key){
          case 'username':
            result.key = '请填写邮箱';
            break;
          case 'password':
            result.key = '请填写密码';
            break;
          case 'repeatPassword':
            result.key = '请重复密码';
            break;
        }
        break;
      }
    }
    return result;
  },
  notificationErrorMessage (error : any, time : number) {
    // console.log(error);
    // console.log(error)
    // console.trace()
    let errCode = error['err_code'];
    if (errCode || errCode === 0) {
      let errorMessage = ErrorMessages[errCode];
      if (errorMessage) {
        message.error(errorMessage, time);
      }else{
        message.error('没有后端匹配的错误信息', time);
      }
    }
    if (!error['err_code']) {
      let messageValue = error.msg ? error.msg : error.message
      message.error(messageValue , time);
    }
  },
  notificationSuccessMessage (info : any, time : number) {
    message.success(info.message, time);
  },
  debounce(fn : any, delayTime : number){
    let timer : any = null
    return function(name : any) {
      if(timer || timer == 0){
        clearTimeout(timer)
        timer = setTimeout(()=>fn(name),delayTime)
      }else{
        timer = setTimeout(()=>fn(name),delayTime)
      }
    }
  },
  reducer () {
    // uploadFile().
  }
}
export default CommonController;