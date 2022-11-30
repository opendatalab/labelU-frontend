import  axiosProxy from './axiosProxy';
import CommonController from "../utils/common/common";
const { axiosInstance } = axiosProxy;
const createSamples = async function (taskId : number,data : any){
    // try {
    let res = await axiosInstance({
        url : `/api/v1/${taskId}/samples`,
        method : 'POST',
        data
    });
    return res;
    // }catch (e) {
    //     CommonController.notificationErrorMessage(e, 5);
    // }
}



export {
    createSamples
};