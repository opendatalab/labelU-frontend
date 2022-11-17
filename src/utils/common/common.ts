import { message } from 'antd';
import { ErrorMessages } from '../../services/errorMessage';
const CommonController = {
  checkLoginAndSignUp (params : any) {

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
      if (obj[key] === undefined) {
        result.tag = true;
        result.key = key === 'email' ? '邮箱' : '密码';
        break;
      }
    }
    return result;
  },
  notificationErrorMessage (error : any, time : number) {
    let errCode = error['err_code'];
    if (errCode || errCode === 0) {
      let errorMessage = ErrorMessages[errCode];
      if (errorMessage) {
        message.error(errorMessage, time);
      }else{
        message.error('没有后端匹配的错误信息', time);
      }
    }
    if (error['self']) {
      message.error(error.msg, time);
    }
  }
}
export default CommonController;