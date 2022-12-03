import React, { useState, useEffect } from 'react';
import SliderCard from './components/sliderCard';
import {getPrevSamples, getSample} from '../../services/samples';
import commonController from '../../utils/common/common';
import currentStyles from './index.module.scss';
import Ob from '../../utils/Observable'
import { debounceTime } from 'rxjs'
import {useNavigate} from "react-router";
const SlideLoader = ()=>{
    const [prevImgList, setPrevImgList] = useState<any[]>([]);
    let taskId = parseInt(window.location.pathname.split('/')[2]);
    let sampleId = parseInt(window.location.pathname.split('/')[4]);
    const [upNoneTipShow, setUpNoneTipShow] = useState(false);
    const [downNoneTipShow, setDownNoneTipShow] = useState(false);
    const [requestUpDoor, setRequestUpDoor] = useState(true);
    const [requestDownDoor, setRequestDownDoor] = useState(true);
    const requestPreview = (params : any, currentImg ?: any)=>{
        getPrevSamples(taskId,params).then(res=>{

            if (res.status === 200) {
                let newPrevImgList : any[] = [];
                for (let prevImg of res.data.data) {
                    let transformedPrevImg : any = commonController.transformFileList(prevImg.data, prevImg.id);
                    //delete
                    transformedPrevImg[0].state = prevImg.state;
                    newPrevImgList.push(transformedPrevImg[0]);
                }
                let temp : any = Object.assign([], prevImgList);
                if (currentImg) {  temp = [ currentImg ] };

                if(newPrevImgList.length === 0) {
                    if(params.after || params.after === 0){
                        setDownNoneTipShow(true);
                        setRequestDownDoor(false);
                    }else{
                        setUpNoneTipShow(true);
                        setRequestUpDoor(false)
                    }
                    if(currentImg) { setPrevImgList(temp); }
                }else{
                    if (params.after || params.after === 0) {
                        setPrevImgList(temp.concat([],newPrevImgList));

                    }else{
                        setPrevImgList(newPrevImgList.concat(temp));

                    }
                    // prevImgList.(newPrevImgList);
                }
            }else{
                if(currentImg) { setPrevImgList(currentImg); }
                commonController.notificationErrorMessage({message : '请求samples数据问题'}, 1);
            }
        }).catch(error=>{
            if(currentImg) { setPrevImgList(currentImg); }
            commonController.notificationErrorMessage(error, 1);
        })
    }
    const lazyLoading = (e : any)=>{
        let self = this;
        let scrollHeight = e.target.scrollHeight;
        let scrollTop = e.target.scrollTop;
        let clientHeight = e.target.clientHeight;
        // console.log("------------")
        // console.log(scrollHeight)
        // console.log(scrollTop)
        // console.log(scrollBottom)
        // console.log(e.target);
        if (scrollHeight - scrollTop == clientHeight  && requestDownDoor
        ) {
            requestPreview({
                after : prevImgList[prevImgList.length - 1]['id'],
                pageSize : 10
            })
        }

        if(scrollTop === 0 && requestUpDoor){
            requestPreview({
                before : prevImgList[0]['id'],
                pageSize : 10
            })
        }
    }
    const getSampleLocal = async function(){
        let sampleRes = await getSample(taskId, sampleId);
        if (sampleRes.status === 200) {
            console.log(sampleRes);
            let newSample = commonController.transformFileList(sampleRes.data.data.data, sampleRes.data.data.id);
            console.log(newSample);
            await requestPreview({
                after : sampleId
                ,pageSize : 10
            }, newSample[0])
        }else{
            commonController.notificationErrorMessage({message : '请求任务出错'}, 1);
        }
    }
    const navigate = useNavigate();
    // @ts-ignore
    Ob.skipped?.pipe(debounceTime(100)).subscribe(()=>{
        if (!(window.location.search.indexOf('SKIPPED') > -1)) {return;}
        console.log(parseInt(window.location.pathname.split('/')[4]));
        let temp = Object.assign([],prevImgList);
        let nextPageId : any= null;
        for (let prevImgIndex =  0; prevImgIndex < temp.length; prevImgIndex++) {
            let prevImg : any= temp[prevImgIndex];
            if (prevImg.id === sampleId) {
                prevImg.state = 'SKIPPED';
                if (temp[prevImgIndex + 1]) {
                    // @ts-ignore
                    nextPageId = temp[prevImgIndex + 1].id;
                }
                break;
            }
        }
        setPrevImgList(temp);
        // navigate()
        if(nextPageId || nextPageId === 0){
            let pathnames = window.location.pathname.split('/');
            pathnames.splice(4,1,nextPageId);
            navigate(pathnames.join('/'))
        }else{
            commonController.notificationInfoMessage({message : '已经是最后一张'}, 1);
        }
    })
    // @ts-ignore
    Ob.nextPage?.pipe(debounceTime(100)).subscribe(()=>{
        console.log(parseInt(window.location.pathname.split('/')[4]));
        if (!(window.location.search.indexOf('DONE') > -1)) {return;}
        let temp = Object.assign([],prevImgList);
        let nextPageId : any= null;
        for (let prevImgIndex =  0; prevImgIndex < temp.length; prevImgIndex++) {
            let prevImg : any= temp[prevImgIndex];
            if (prevImg.id === sampleId) {
                prevImg.state = 'DONE';
                if (temp[prevImgIndex + 1]) {
                    // @ts-ignore
                    nextPageId = temp[prevImgIndex + 1].id;
                }
                break;
            }
        }
        setPrevImgList(temp);
        // navigate()
        if(nextPageId || nextPageId === 0){
            let pathnames = window.location.pathname.split('/');
            pathnames.splice(4,1,nextPageId);
            navigate(pathnames.join('/'))
        }else{
            commonController.notificationInfoMessage({message : '已经是最后一张'}, 1);
        }
    })
    useEffect(()=>{
        getSampleLocal();
    },[]);
    // const updataCurrentPrevsample = async function () {
    //     let sampleRes = await getSample(taskId, sampleId);
    //     if (sampleRes.status === 200) {
    //         console.log(sampleRes);
    //         let newSample = commonController.transformFileList(sampleRes.data.data.data, sampleRes.data.data.id);
    //         console.log(newSample);
    //         let temp : any = Object.assign([],prevImgList);
    //         for (let prevImg of temp) {
    //             if (prevImg.id == newSample[0].id) {
    //                 prevImg.state = sampleRes.data.data.state;
    //                 break;
    //             }
    //         }
    //         setPrevImgList(temp);
    //     }else{
    //         commonController.notificationErrorMessage({message : '请求任务出错'}, 1);
    //     }
    // }
    // useEffect(()=>{
    //     console.log('dafdfasdfaisdjflkasdfiojasdlfjaklsdjfiasdjfijasdlkfjas')
    //     console.log(window.location.search)
    //     updataCurrentPrevsample();
    // },[window.location.pathname])
    return (<div className = { currentStyles.leftBar }
    onScroll={lazyLoading}>
        {upNoneTipShow && <div>向上没有了</div>}
        {
            prevImgList.map((item : any)=>{
                return (
                  <SliderCard cardInfo = {item} />
                )
            })
        }
        {downNoneTipShow && <div>向下没有了</div>}
    </div>)
}
export default SlideLoader;