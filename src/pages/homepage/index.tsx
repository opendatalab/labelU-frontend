import React from 'react';
import currentStyles from './index.module.scss';
import Navigate from '../../components/navigate/index';
import { Outlet } from 'react-router-dom';
const Homepage = ()=>{
    return (<div className = {currentStyles.outerFrame}>
        <Navigate />
        <div className = { currentStyles.content }>
            <Outlet />
        </div>
        {/*<TaskList />*/}
    </div>)
}
export  default Homepage;