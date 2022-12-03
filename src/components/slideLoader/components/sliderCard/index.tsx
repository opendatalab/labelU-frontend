import React, {useState, useEffect } from 'react';
import currentStyles from './index.module.scss';
import commonController from '../../../../utils/common/common'
import { getSample } from '../../../../services/samples'

import { useSelector, useDispatch, connect } from 'react-redux';

import { updateCurrentSampleId } from '../../../../stores/sample.store';
import otherStore from "../../../../stores/other";
import { useNavigate} from "react-router";

const SliderCard = (props : any)=>{
    const {id, state, url} = props.cardInfo;
    const [currentSampleId, setCurrentSampleId] = useState(parseInt(window.location.pathname.split('/')[4]));
    const navigate = useNavigate();
    const clickSample = ()=>{

        let location = window.location.pathname.split('/');
        location.pop();
        location.push(id)
        let newPathname = location.join('/');
        navigate(newPathname);
    }
    useEffect(()=>{
        setCurrentSampleId(parseInt(window.location.pathname.split('/')[4]));
    },[window.location.pathname]);
    return (
        <React.Fragment>
            {
                id === currentSampleId && <div className = { currentStyles.outerFrame }>
                    <div className = { currentStyles.contentActive }
                         onClick = { clickSample }
                    >
                        <img  src={ (url) } alt="" style = {{ height : '100%', maxWidth : '100%' }}
                        />
                        {
                            state === 'Done' && <React.Fragment>
                                <div className={ currentStyles.tagBottom }></div>
                                <div className={ currentStyles.tagTop }></div>
                            </React.Fragment>
                        }
                        {
                            state === 'SKIPPED' && <div className={ currentStyles.skipped }>
                                跳过
                            </div>
                        }
                    </div>
                    <div className = {currentStyles.idHighlight}>{id}</div>
                </div>
            }
            {
                id !== currentSampleId && <div className = { currentStyles.outerFrame }>
                    <div className = { currentStyles.content }
                         onClick = { clickSample }
                    >
                        <img  src={ (url) } alt="" style = {{ height : '100%', maxWidth : '100%' }}
                        />
                        {
                            state === 'Done' && <React.Fragment>
                                <div className={ currentStyles.tagBottom }></div>
                                <div className={ currentStyles.tagTop }></div>
                            </React.Fragment>
                        }
                        {
                            state === 'SKIPPED' && <div className={ currentStyles.skipped }>
                                跳过
                            </div>
                        }
                    </div>
                    <div>{id}</div>
                </div>
            }
        </React.Fragment>
        )
}
export default SliderCard;