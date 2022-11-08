import React from 'react';
import currentStyles from './index.module.scss';
const LogoTitle = ()=>{
    return (<div className = {currentStyles.outerFrame}>
        <div className={currentStyles.logo}></div>
        <div className={currentStyles.logoText}>
            <div>Uniform, Unlimited, Universal and Unbelievable</div>
            <div>Annotation Toolbox</div>
        </div>
    </div>)
}
export default LogoTitle;