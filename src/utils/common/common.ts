import { message } from 'antd';
import { ErrorMessages } from '../../services/errorMessage';
const CommonController = {
  checkLoginAndSignUp (params : any) {

  },
  checkEmail () {

  },
  checkPassword () {

  },
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