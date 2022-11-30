import React, { useEffect } from 'react';
import currentStyles from './index.module.scss';
import Navigate from '../../components/navigate/index';
import {Outlet, useNavigate} from 'react-router-dom';
import constants from '../../constants'
const Homepage = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.location.pathname === '/') {
            navigate(constants.urlToTasks)
        }
    },[]);
    return (<div className = {currentStyles.outerFrame}>
        <Navigate />
        <div className = { currentStyles.content }>
            <Outlet />
        </div>
        {/*<TaskList />*/}
    </div>)
}
export  default Homepage;