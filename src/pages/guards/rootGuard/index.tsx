import React from 'react';
import { Outlet, redirect } from "react-router-dom";
import constants from '../../../constants';
import Login from '../../login1'
// export async function action({request , params } : any){
//     console.log({request,params})
//     return redirect(constants.urlTurnToSignUp);
// }
const RootGuard = ()=>{
    console.log(window.history);
    console.log(window.location.pathname)
    let token = window.localStorage.getItem('token');
    console.log(token);
    // if (token) {
    //     return (<Outlet />)
    // }else{
    //     return redirect(constants.urlToLogin)
    // }
    return (<React.Fragment>
            { token ?
                <Outlet/> : <Login />}
            {/*<Outlet/>*/}
        </React.Fragment>
        )
}
export default RootGuard;