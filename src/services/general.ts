import  axiosProxy from './axiosProxy';
import CommonController from "../utils/common/common";
const { axiosInstance } = axiosProxy;
const login = async function (params : { email : string, password : string}){
    try {
        let res = await axiosInstance({
            url : '/api/v1/users/login',
            method : 'POST',
            data : params
        });

    }catch (e) {
     CommonController.notificationErrorMessage(e, 5);
    }
}

export {
    login
};