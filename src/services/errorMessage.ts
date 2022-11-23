const COMMON_INIT_CODE = 30000;
const USER_INIT_CODE = 40000;
const TASK_INIT_CODE = 50000;

export const ErrorMessages : any = {
    400 : '参数有问题',
    [USER_INIT_CODE] : '无效的用户名或密码',
    [USER_INIT_CODE + 1] : '用户已经存在',
    [USER_INIT_CODE + 2] : '用户没发现',
    [USER_INIT_CODE + 3] : '不能验证证书',
    // [USER_INIT_CODE + 4] : '没有授权',
    [TASK_INIT_CODE] : '服务器内部错误'
}