import React from 'react';
import currentStyles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
const Step = (props : any)=>{
    const { title, ordinalNumber, contentUrl } = props;
    const navigate = useNavigate();

    const turnToOutlet = ()=>{
      navigate(contentUrl);
    }
    return (<div className = {currentStyles.outerFrame} onClick={turnToOutlet}>
        <div className = {currentStyles.icon}>
            {/*<Button shape = 'circle' size = 'small'>{ ordinalNumber }</Button>*/}
            {ordinalNumber}
        </div>
        <div className = {currentStyles.title}> {title} </div>
    </div>)
}
export  default Step;