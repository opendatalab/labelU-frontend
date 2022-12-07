import React, {useState, useEffect, useCallback, useMemo} from 'react';
import SliderCard from './components/sliderCard';
import {getPrevSamples, getSample} from '../../services/samples';
import commonController from '../../utils/common/common';
import currentStyles from './index.module.scss';
import Ob from '../../utils/Observable'
import { debounceTime, scan } from 'rxjs'
import {useNavigate} from "react-router";
import {useSelector, connect, Provider} from 'react-redux';
import store from '../../stores';
const SlideLoader = ()=>{
    const [prevImgList, setPrevImgList] = useState<any[]>([]);
    // const t = useSelector(state=>{console.log(state); return state;})
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
                    if(currentImg) {
                        setPrevImgList(temp);
                    // Ob.nextPageS.next(temp);
                    }
                }else{
                    if (params.after || params.after === 0) {
                        setPrevImgList(temp.concat([],newPrevImgList));
                        // Ob.nextPageS.next(temp.concat([],newPrevImgList))

                    }else{
                        setPrevImgList(newPrevImgList.concat(temp));
                        // Ob.nextPageS.next(newPrevImgList.concat(temp));
                    }
                    return newPrevImgList[0].id;
                    // prevImgList.(newPrevImgList);
                }
            }else{
                if(currentImg) {
                    setPrevImgList(currentImg);
                    // Ob.nextPageS.next(currentImg)
                }
                commonController.notificationErrorMessage({message : '请求samples数据问题'}, 1);
            }
        }).catch(error=>{
            if(currentImg) {
                setPrevImgList(currentImg);
                // Ob.nextPageS.next(currentImg);
            }
            commonController.notificationErrorMessage(error, 1);
        })
    }
    const lazyLoading = (e : any)=>{
        let self = this;
        let scrollHeight = e.target.scrollHeight;
        let scrollTop = e.target.scrollTop;
        let clientHeight = e.target.clientHeight;

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
            // console.log(sampleRes);
            let newSample : any= commonController.transformFileList(sampleRes.data.data.data, sampleRes.data.data.id);
            newSample[0].state = sampleRes.data.data.state;
            // console.log(newSample);
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
        // Ob.nextPageS?.pipe(debounceTime(100)).subscribe({next : (state)=>{
        //         if(state !== 'DONE'){ return;}
        //         console.log(parseInt(window.location.pathname.split('/')[4]));
        //         // if (!(window.location.search.indexOf('DONE') > -1)) {return;}
        //         console.log(prevImgList)
        //         let temp = Object.assign([],prevImgList);
        //         let nextPageId : any= null;
        //         for (let prevImgIndex =  0; prevImgIndex < temp.length; prevImgIndex++) {
        //             let prevImg : any= temp[prevImgIndex];
        //             if (prevImg.id === sampleId) {
        //                 prevImg.state = 'DONE';
        //                 if (temp[prevImgIndex + 1]) {
        //                     // @ts-ignore
        //                     nextPageId = temp[prevImgIndex + 1].id;
        //                 }
        //                 break;
        //             }
        //         }
        //         setPrevImgList(temp);
        //         // navigate()
        //         if(nextPageId || nextPageId === 0){
        //             let pathnames = window.location.pathname.split('/');
        //             pathnames.splice(4,1,nextPageId);
        //             navigate(pathnames.join('/'))
        //         }else{
        //             commonController.notificationInfoMessage({message : '已经是最后一张'}, 1);
        //         }
        //     }})
    const getAfterSampleId = async function (params) {
        let samplesRes =  await getPrevSamples(taskId,params);
        if (samplesRes.status === 200) {
                let newPrevImgList : any[] = [];
                for (let prevImg of samplesRes.data.data) {
                    let transformedPrevImg : any = commonController.transformFileList(prevImg.data, prevImg.id);
                    //delete
                    transformedPrevImg[0].state = prevImg.state;
                    newPrevImgList.push(transformedPrevImg[0]);
                }
                if(newPrevImgList.length === 0) {
                    return undefined;
                }else{
                    return newPrevImgList;
                }
            }else{
                commonController.notificationErrorMessage({message : '请求samples数据问题'}, 1);
                return undefined;
            }
    }
    const updatePrevImageListState = async function (state : string){
        let temp : any= Object.assign([],prevImgList);
        console.log(temp)
        let nextPageId : any= null;
        for (let prevImgIndex =  0; prevImgIndex < temp.length; prevImgIndex++) {
            let prevImg : any= temp[prevImgIndex];
            if (prevImg.id === sampleId) {
                prevImg.state = state;
                if (temp[prevImgIndex + 1]) {
                    // @ts-ignore
                    nextPageId = temp[prevImgIndex + 1].id;
                }else{
                    nextPageId = await getAfterSampleId({
                        after : prevImgList[prevImgList.length - 1]['id'],
                        pageSize : 10
                    })
                }
                break;
            }
        }
        if(nextPageId || nextPageId === 0){
            let pathnames = window.location.pathname.split('/');
            if (typeof nextPageId !== 'number') {
                setPrevImgList(temp.concat(nextPageId));
                pathnames.splice(4,1,nextPageId[0].id);
            }else{
                // @ts-ignore
                pathnames.splice(4,1,nextPageId);
            }
            navigate(pathnames.join('/'));
        }else{
            setPrevImgList(temp);
            let currentPathname = window.location.pathname.split('/');
            currentPathname.pop();
            currentPathname.push('finished')
            navigate(currentPathname.join('/')+'?sampleId='+temp[temp.length - 1]?.id);
            // commonController.notificationInfoMessage({message : '已经是最后一张'}, 1);
        }
    }

    const updatePrevImgList = (prevImgList : any)=>{
        setPrevImgList(prevImgList)
    }

    useEffect(()=>{
        getSampleLocal();

        // @ts-ignore
        Ob.skipped?.pipe(debounceTime(100)).subscribe((state)=>{
            if(state !== 'SKIPPED'){ return;}
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
            // console.log(nextPageId)
            // navigate()
            if(nextPageId || nextPageId === 0){
                let pathnames = window.location.pathname.split('/');
                pathnames.splice(4,1,nextPageId);
                navigate(pathnames.join('/'))
            }else{
                // commonController.notificationInfoMessage({message : '已经是最后一张'}, 1);
                let currentPathname = window.location.pathname.split('/');
                currentPathname.pop();
                currentPathname.push('finished')
                navigate(currentPathname.join('/'))
            }
        })

            // @ts-ignore
            // Ob.nextPageS?.pipe(scan(prevImgList=>prevImgList)).subscribe({next : (state)=>{
            //         // if(state === 'DONE'){ return;}
            //         updatePrevImageListState()
            //     }});

        }
        ,[]);


    useEffect(()=>{
        // console.log(window.location.search);
        let search = window.location.search;
        if(search.indexOf('DONE') > -1){
            updatePrevImageListState('DONE');
        }
        if(search.indexOf('SKIPPED') > -1){
            updatePrevImageListState('SKIPPED');
        }
    },[window.location.search])
    return (
        <Provider store = {store}>
        <div className = { currentStyles.leftBar }
    onScroll={lazyLoading}>
        {upNoneTipShow && <div className={currentStyles.tips}>已到第一张</div>}
        {
            prevImgList.map((item : any)=>{
                return (
                  <SliderCard cardInfo = {item} />
                )
            })
        }
        {downNoneTipShow && <div className = { currentStyles.tips }>已到最后一张</div>}
    </div>
        </Provider>
            )
}


export default (SlideLoader);