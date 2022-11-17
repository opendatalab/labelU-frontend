import  axiosProxy from './axiosProxy';
import CommonController from "../utils/common/common";
const { axiosInstance } = axiosProxy;
const login = async function (params : { username : string, password : string}){

        let res = await axiosInstance({
            url : '/api/v1/users/login',
            method : 'POST',
            data : params
        });
    return res.data.data.token;
}

const signUp = async function (params : { username : string, password : string}){
    // try {
        let res = await axiosInstance({
            url : '/api/v1/users/signup',
            method : 'POST',
            data : params
        });
        return res;
    // }catch (e) {
    //     CommonController.notificationErrorMessage(e, 5);
    // }
}

export {
    login,
    signUp
};