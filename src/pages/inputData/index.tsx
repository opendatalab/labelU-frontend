import React, { useState, useEffect } from 'react';
import currentStyles from './index.module.scss';
import {Upload, Form, Table} from 'antd';
import type { UploadProps } from 'antd';
import { FileAddOutlined, FolderOpenOutlined, PictureOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import commonController from "../../utils/common/common";
import { uploadFile as uploadFileService } from "../../services/createTask";
import { Tree } from 'antd';
import {useSelector, useDispatch} from "react-redux";
import { updateNewSamples } from '../../stores/sample.store';
let newFileList : any[] = [];
let newFileListInfo : any[] = [];
let newFolder : any = {};
let saveFolderFiles : any[] =[];
const InputInfoConfig = ()=>{
    const { DirectoryTree } = Tree;
    const dispatch = useDispatch();
    let configStep = useSelector(state=>state.existTask.configStep );
    let haveConfigedStep =  useSelector(state=>state.existTask.haveConfigedStep );
    let taskName = useSelector(state=>state.existTask.taskName );
    let taskDescription = useSelector(state=>state.existTask.taskDescription );
    let taskTips = useSelector(state=>state.existTask.taskTips );
    let taskId = useSelector(state=>state.existTask.taskId );
    const [uploadedTotal, setUploadedTotal] = useState(0);
    const [uploadedSuccessful, setUploadedSuccessful] = useState(0);
    const [uploadedFailed, setUploadedFailed] = useState(0);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [haveUploadFiles, setHaveUploadFiles] = useState<any[]>([]);
    const handleChange : UploadProps['onChange'] = (info)=>{
        let newFileList1 = [...info.fileList];
        newFileList = newFileList1;
    }



    const finishUpload = (values : any)=>{
    }

    const [flag, setFlag] = useState(true);


    const customRequest = (v:any)=>{
    }
    const uploadFileChange = (k:any)=>{
    }
    const items = [{
        fileName : 'test1.txt',
        status : 0,
        option : ()=>{
        }
    }];
    const renewUploadFileInFolder = async function(data : any){
        let result = await uploadFileService(1, data.params);
        let temp : any= Object.assign([],haveUploadFiles);
        if (result?.status === 201) {
            commonController.updateElement(saveFolderFiles,0,data.path, false);
        }else{
            commonController.updateElement(saveFolderFiles,0,data.path, true);
        }
        setHaveUploadFiles(saveFolderFiles);
    }
    // uploadFolder
    const deleteFile = (path : string)=>{
        commonController.findElement(saveFolderFiles, 0, path);
        setHaveUploadFiles(saveFolderFiles);
    }
    const isInArray = (children : any, index : number, paths : any)=>{
        return children.some((childItem : any)=> childItem.title === paths[index]);
    };
    const getIndexInArray = (children : any, index : any, paths : any)=>{
        return children.find((childrenItem:any)=>childrenItem.title === paths[index]);
    };
    const confirmFolder = (parent : any , index : any, paths : any, data : any)=>{
        let child = undefined;
        if (parent.children) {
            child = isInArray(parent.children, index, paths);
        }else{
            parent.icon = <img src="/src/icons/folder.png"/>;
            parent.title =  paths[index];
            parent.key = new Date().getTime() + Math.random();
            parent.children =  [];
            parent.path = paths[index];
            child = false;
            confirmFolder(parent, index, paths, data);
            return;
        }
        if(!child){
            if (index === paths.length - 1) {
                parent.children.push({
                    icon : <img src="/src/icons/picture.png" alt=""/>,
                    title : (<div className = {currentStyles.itemInFolder}>
                        <div className = {currentStyles.columnFileName}>{paths[paths.length - 1]}</div>
                        <div className = {currentStyles.columnStatus}>{data.hasUploaded === 1 ?
                            (<div className={currentStyles.uploadStatus}><img src="/src/icons/pending" alt=""/>上传中</div>) :
                            (data.hasUploaded === 2 ? (<div className={currentStyles.uploadStatus}><img src="/src/icons/pending.png" alt=""/>等待中</div>) :
                                    (data.hasUploaded === 3 ? (<div className={currentStyles.uploadStatus}><div className={currentStyles.greenCircle}></div>上传成功</div>) :
                                            (<div className={currentStyles.uploadStatus}><div className={currentStyles.redCircle}></div>上传失败</div>)
                                    )
                            )
                        }</div>
                        <div className = {currentStyles.columnOptionButtons}>
                            {data.hasUploaded === 4 && <div className = {currentStyles.columnOption1}
                            onClick = {()=>renewUploadFileInFolder(data)}> 重新上传 </div>}
                            <div className = {currentStyles.columnOption}
                                 onClick = {commonController.debounce((event : any)=>deleteFile(data.path),1000)}
                                 // onClick = {deleteFile}
                            >删除</div>
                        </div>
                    </div>),

                    key : new Date().getTime() + Math.random(),
                    path : paths[index],
                    isLeaf : true
                })
            }else{
                parent.children.push({
                    icon : <img src= '/src/icons/folder.png' />,
                    title : <span>&nbsp;&nbsp;{paths[index]}</span>,
                    key : new Date().getTime() + Math.random(),
                    path : paths[index],
                    children : []
                })
                confirmFolder(parent.children[parent.children.length - 1], index + 1, paths, data);
            }
        }else{
            if (index !== paths.length - 1) {
                let childIndex = getIndexInArray(parent.children, index, paths);
                if (childIndex || childIndex === 0) {
                    confirmFolder(parent.children[childIndex], index + 1, paths, data);
                }else{
                    console.log('数据有问题')
                }
            }else{
                parent.children.push({
                    icon : <img src= '/src/icons/folder.png' />,
                    title : paths[paths.length - 1],
                    key : new Date().getTime() + Math.random(),
                    isLeaf : true,
                    path : paths[paths.length - 1]
                })
            }
        }
    }
    const setupFolder = ( path : string, fileIndex : number, data : any )=>{
        if (!path) {
            return;
        }else{
            let paths = path.split('/');
            if (fileIndex === 0) {
                newFolder.title = <span>&nbsp;&nbsp;{paths[0]}</span>;
                newFolder.key = new Date().getTime() + Math.random();
                newFolder.children = [];
                newFolder.icon = <img src="/src/icons/folder.png" alt=""/>
                newFolder.path = paths[0];
            }
            confirmFolder(newFolder,  1, paths, data);
        }
    }
    const addSizeToFiles = (files : any)=>{
        for (let fileIndex = 0; fileIndex < files?.length; fileIndex++) {
            files[fileIndex].OriginSize = files[fileIndex].file.size;
        }
    }
    const isCorrectFiles = (files : any)=>{
        let result = true;
        if (files.length > 100) {
            commonController.notificationErrorMessage({message : '单次上传文件数量超过上限100个，请分批上传'}, 3);
            return;
        }
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            let fileUnit = files[fileIndex];
            let isOverSize = commonController.isOverSize(fileUnit.OriginSize);
            if(isOverSize) {
                commonController.notificationErrorMessage({message : '单个文件大小超过100MB限制'}, 3);
                result = false;
                break;
            }
            let isCorrectFileType = commonController.isCorrectFileType(fileUnit.file.name);
            if(!isCorrectFileType) {
              commonController.notificationErrorMessage({message : '请上传支持的文件类型，类型包括：jpg、png、bmp、gif'}, 3);
              result = false;break;}
        }
        return result;
    }
    // hasUploaded;
    // 1. 上传中
    // 2. 等待中
    // 3. 上传成功
    // 4. 上传失败
    const updateOneOfHaveUplodaedFileList = (uid : any, hasUploaded : any, result : any)=>{
        let temp = haveUploadFiles.concat([]);
        for (let haveUploadedFilesIndex = 0; haveUploadedFilesIndex < temp.length; haveUploadedFilesIndex++) {
            let haveUploadedFile = temp[haveUploadedFilesIndex];
            if (uid === haveUploadedFile.uid){
                haveUploadedFile.hasUploaded = hasUploaded;
                if (result) {
                  haveUploadedFile.uploadId = result?.data.data.id;
                  haveUploadedFile.url = result.data.data.url;
                  haveUploadedFile.id = result.data.data.id;
                }
              // uploadId : result?.data.data.id,
              // url : result.data.data.url,
              // id : result.data.data.id,
                setHaveUploadFiles(temp);
                break;
            }
        }
    }
    const addToHaveUploadFilesList = (currentNewFileList : any)=>{
      let currentListContainer = [];
      for (let currentNewFileListIndex = 0; currentNewFileListIndex < currentNewFileList.length; currentNewFileListIndex++) {
          let currentInfo =  currentNewFileList[currentNewFileListIndex];
          currentListContainer.push({
              name : currentInfo.file.name,
              size : currentInfo.file.size,
              hasUploaded : 2,
              // uploadId : result?.data.data.id,
              // url : result.data.data.url,
              // id : result.data.data.id,
              params : {
                  path : currentInfo.file.webkitRelativePath ? currentInfo.file.webkitRelativePath : './',
                  file : currentInfo.file
              },
              uid : currentInfo.file.uid
          });
      }
        if (commonController.isNullObject(newFolder)) {
            setHaveUploadFiles(haveUploadFiles.concat(currentListContainer))
            saveFolderFiles = saveFolderFiles.concat(currentListContainer);
        }else{
            setHaveUploadFiles(haveUploadFiles.concat(currentListContainer, [newFolder]))
            saveFolderFiles.push(newFolder);
        }
    }
    const [startToUpload, setStartToUpload] = useState(1);
    const newCustomRequest = async function (info : any){
        newFileListInfo.push(info);
        if (newFileListInfo.length === newFileList.length) {
            let middleTemp = newFileListInfo.concat([]);
            addSizeToFiles(middleTemp);
            let isCorrectCondition = isCorrectFiles(middleTemp);
            if(!isCorrectCondition){
                // commonController.notificationErrorMessage({message : '请重新选择合适的文件'}, 2);
                newFileList = [];
                newFileListInfo = [];
                return;
            }
            let currentHaveUploadFiles = [];

            setUploadedTotal(uploadedTotal + newFileList.length);
            setTemp(newFileListInfo.concat([]));
            addToHaveUploadFilesList(newFileListInfo.concat([]));
            setStartToUpload(startToUpload + 1);
            // for (let newFileListInfoIndex = 0; newFileListInfoIndex < middleTemp.length; newFileListInfoIndex++) {
            //
            //     let currentInfo =  middleTemp[newFileListInfoIndex];
            //     let path = currentInfo.file.webkitRelativePath ? currentInfo.file.webkitRelativePath : './';
            //     let result = undefined;
            //     // if (path.indexOf('/') > -1)
            //     {
            //         result = await uploadFileService(taskId, {  file : currentInfo.file  });
            //         if (result?.status === 201) {
            //             setUploadedSuccessful(uploadedSuccessful + 1);
            //             updateOneOfHaveUplodaedFileList(currentInfo.file.uid, 3);
            //             // currentHaveUploadFiles.push({name : currentInfo.file.name,
            //             //     size : currentInfo.file.size,
            //             //     hasUploaded : 3,
            //             //     uploadId : result?.data.data.id,
            //             //     url : result.data.data.url,
            //             //     id : result.data.data.id,
            //             //     params : {
            //             //       path,
            //             //       file : currentInfo.file
            //             //     }
            //             // });
            //         }else{
            //             updateOneOfHaveUplodaedFileList(currentInfo.file.uid, 4);
            //             // currentHaveUploadFiles.push({name : currentInfo.file.name,
            //             //     size : currentInfo.file.size,
            //             //     hasUploaded : 4,
            //             //     params : {
            //             //         path ,
            //             //         file : currentInfo.file
            //             //     }
            //             // });
            //         }
            //         // if (commonController.isNullObject(newFolder)) {
            //         //     setHaveUploadFiles(haveUploadFiles.concat(currentHaveUploadFiles))
            //         //     saveFolderFiles = saveFolderFiles.concat(currentHaveUploadFiles);
            //         // }else{
            //         //     saveFolderFiles.push(newFolder);
            //         //     setHaveUploadFiles(haveUploadFiles.concat(currentHaveUploadFiles, [newFolder]))
            //         // }
            //     }
            //
            //     // setHaveUploadFiles(haveUploadFiles.concat(currentHaveUploadFiles))
            // }
            // if (commonController.isNullObject(newFolder)) {
            //     setHaveUploadFiles(haveUploadFiles.concat(currentHaveUploadFiles))
            //     saveFolderFiles = saveFolderFiles.concat(currentHaveUploadFiles);
            // }else{
            //     setHaveUploadFiles(haveUploadFiles.concat(currentHaveUploadFiles, [newFolder]))
            //     saveFolderFiles.push(newFolder);
            // }
            newFileList = [];
            newFileListInfo = [];
            newFolder = {};
        }
    }
    const [temp,setTemp] = useState<any>([]);
    const [tempC,setTempC] = useState<any>(0);
    const [startUploadFlag, setStartUploadFlag] = useState(false);
    const upLoadFiles = async function () {
        // let temp = newFileListInfo.concat([]);
        // setTemp(temp);
        setStartUploadFlag(true);
        for (let newFileListInfoIndex = 0; newFileListInfoIndex < temp.length; newFileListInfoIndex++) {
            let currentInfo =  temp[newFileListInfoIndex];
            let result = undefined;
            // if (path.indexOf('/') > -1)
            {
                result = await uploadFileService(taskId, {  file : currentInfo.file  });
                setTempC(newFileListInfoIndex + 1);
                if (result?.status === 201) {
                    setUploadedSuccessful(uploadedSuccessful + 1);
                    updateOneOfHaveUplodaedFileList(currentInfo.file.uid, 3, result);
                }else{
                    updateOneOfHaveUplodaedFileList(currentInfo.file.uid, 4, undefined);
                }
            }
        }
        setStartUploadFlag(false);
    }
    useEffect(()=>{
        if (startToUpload === 1) {
            return;
        }else{
            upLoadFiles().catch((error:any) => commonController.notificationErrorMessage(error,3));
        }
    },[startToUpload])
    const [folderFilePath, setFolderFilePath] = useState(1);
    const handleUploadFolderChange : UploadProps['onChange']  = (info)=>{

        let newFileList1 = [...info.fileList];
        newFileList = newFileList1;

    }

    const deleteUploadFiles = ()=>{
    }

    const deleteSingleFile = (itemIndex : number)=>{

       const tempArr = Object.assign([],haveUploadFiles);
       tempArr.splice(itemIndex,1);
       commonController.notificationSuccessMessage({message : '删除成功'},1)
        setDeleteTag(true);
       setHaveUploadFiles(tempArr);
    }
    const renewUpload = async function(item : any, itemIndex : number){
        let result = await uploadFileService(taskId, item.params);
        let temp : any= Object.assign([],haveUploadFiles);
        if (result?.status === 201) {
            temp[itemIndex].hasUploaded = 3;
        }else{
            temp[itemIndex].hasUploaded = 4;
        }
        setHaveUploadFiles(temp);
    }
    const updateUploadedFiles = ()=>{
        let result = [];
        for (let fileIndex = 0; fileIndex < haveUploadFiles.length; fileIndex++ ) {
            let fileItem = haveUploadFiles[fileIndex];
            if(fileItem.id || fileItem === 0){
                let newItem = {
                    attachement_ids : [fileItem.id],
                    data : {
                        result : '{}',
                        urls : {[fileItem.id] : fileItem.url},
                        fileNames : {[fileItem.id] : ''}
                    }
                }
                result.push(newItem);
            }
        }
        dispatch(updateNewSamples(result))
    }
    useEffect(()=>{
        updateUploadedFiles();
    },[haveUploadFiles]);
    const [deleteTag, setDeleteTag] = useState(false);
    useEffect(()=>{
        if(deleteTag) {setDeleteTag(false);return};
        let successfulFiles = 0;
        let failedFiles = 0;
        for (let haveUploadFile of haveUploadFiles) {
            if (haveUploadFile.hasUploaded === 3) {
                successfulFiles = successfulFiles + 1;
            }else{
                failedFiles = failedFiles + 1;
            }
        }
        if (failedFiles === 0 && haveUploadFiles.length > 0) {
            commonController.notificationSuccessMessage({message : successfulFiles + '个文件上传成功'},1);
        }
        if (failedFiles > 0 && haveUploadFiles.length > 0) {
            // commonController.notificationWarnMessage({message : `${successfulFiles}个文件上传成功, ${failedFiles}个文件上传成功`},1);
        }
        setUploadedSuccessful(successfulFiles);
        setUploadedFailed(failedFiles);
    },[haveUploadFiles]);

    const columns = [
      {
        title: '文件名',
        dataIndex: 'name',
        key: 'name',
        // className : currentStyles.tableColumn
        // width: 80,
      },
      {
        title: '地址',
        dataIndex: 'params',
        key: 'address',
        render : (params : any)=>{
          return params.path;
        }
      },
      {
        title: '状态',
        dataIndex: 'hasUploaded',
        key: 'hasUploaded',
        render : (hasUploaded : any)=>{
          // return hasUploaded ?
          //   (<div className={currentStyles.uploadStatus}><div className={currentStyles.greenCircle}></div>已上传</div>) :
          //   (<div className={currentStyles.uploadStatus}><div className={currentStyles.redCircle}></div>上传失败</div>)
          let result;
          switch (hasUploaded) {
              case 1:
                  result = (<div className={currentStyles.uploadStatus}><img src="/src/icons/pending.png" alt=""/>上传中</div>);
                  break;
              case 2:
                  result = (<div className={currentStyles.uploadStatus}><img src="/src/icons/pending.png" alt=""/>等待中</div>);
                  break;
              case 3:
                  result = (<div className={currentStyles.uploadStatus}><div className={currentStyles.greenCircle}></div>上传成功</div>);
                  break;
              case 4:
                  result = (<div className={currentStyles.uploadStatus}><div className={currentStyles.redCircle}></div>上传失败</div>);
                  break;
          }
          return result;
        }
      },
      {
        title: '操作',
        dataIndex: 'hasUploaded',
        key: 'option',
        render : (hasUploaded : any, record : any, index : any)=>{
          return <React.Fragment>{hasUploaded === 4 && <div className = {currentStyles.columnOption1}
                                            onClick = {()=>renewUpload(record, index)}> 重新上传 </div>}
          <div className = {currentStyles.columnOption}
               onClick = { ()=>deleteSingleFile(index) }
          >删除</div>
          </React.Fragment>
        }
      },
    ]
    return (<div className = {currentStyles.outerFrame}>
        <div className = {currentStyles.title}>
            <div className={currentStyles.icon}></div>
            <div className = {currentStyles.titleText}>数据导入</div>
        </div>
        <div className = {currentStyles.content}>
            <div className = {currentStyles.left}>
                <div className = {currentStyles.leftTitle}>本地上传</div>
                <div className = {currentStyles.dragAndDrop}>
                    <div className = { currentStyles.survey }></div>
                    <div className = { currentStyles.buttons }>
                        <div className = { currentStyles.uploadFileButton }>
                            <Upload
                                action = {'/api/v1/tasks/1/upload'}
                                // data = {{path : aa}}
                                fileList = {fileList}
                                // maxCount = {1}
                                onChange = { handleChange }
                                multiple =  {true}
                                showUploadList = {false}
                                customRequest={ newCustomRequest }
                            >
                                {/*<FileAddOutlined style={{color : '#FFFFFF'}} />*/}
                                <div className={currentStyles.buttonDiv}>
                              <img src="/src/icons/uploadFile.svg" alt=""/>
                                <div style = {{display : 'inline-block', color : '#FFFFFF'}}>上传文件</div>
                                </div>
                            </Upload>
                        </div>
                        <div className = { currentStyles.uploadFolderButton }>
                            {/*<div className = {currentStyles.uploadIcon}></div>*/}

                            <Upload directory
                                // customRequest={customReques

                                    action = {'/api/v1/tasks/1/upload'}
                                    // data = {{path : folderFilePath}}
                                    fileList = {fileList}
                                    // maxCount = {1}
                                    onChange = { handleUploadFolderChange }
                                    multiple =  { true }
                                    showUploadList = { false }
                                    customRequest={ newCustomRequest }
                            >
                                {/*<FolderOpenOutlined style = {{color : '#1b67ff'}}/>*/}
                              <div className={currentStyles.buttonDiv}>
                              <img src="/src/icons/uploadFolder.svg" alt=""/>

                              <div style = {{display : 'inline-block', color : '#1b67ff'}}>上传文件夹</div>
                              </div>

                            </Upload>
                        </div>
                    </div>
                    <div className= { currentStyles.illustration }>
                        <div className = { currentStyles.supportType }>&nbsp;支持文件类型包括：jpg、png、bmp、gif。
                        </div>
                        <div className = { currentStyles.advises }> 单次上传文件最大数量为100个，建议单个文件大小不超过100MB </div>
                    </div>
                </div>
            </div>
            <div className={currentStyles.right}>
                {startUploadFlag && temp.length > 0 && <div className={currentStyles.rightTitle}>
                    <div className = {currentStyles.rightTitleLeft}>上传列表</div>
                    {/*<div className = {currentStyles.rightTitleRight}>正在上传&nbsp;*/}
                    {/*    <div  className = {currentStyles.rightTitleRightHight}>10</div>*/}
                    {/*    /30&nbsp;个文件</div>*/}
                    <div>正在上传</div>
                    <div>&nbsp;&nbsp;
                        <div style = {{display : 'inline-block',color : '#1b67ff'}}>{ tempC }</div>
                        /</div>
                    <div>
                        <div style = {{display : 'inline-block',color : 'black'}}>{ temp.length }</div>
                        个文件</div>
                </div>}
                {!startUploadFlag &&haveUploadFiles.length > 0 && <div className={currentStyles.rightTitle}>
                    <div className = {currentStyles.rightTitleLeft}>上传列表</div>
                    {/*<div className = {currentStyles.rightTitleRight}>正在上传&nbsp;*/}
                    {/*    <div  className = {currentStyles.rightTitleRightHight}>10</div>*/}
                    {/*    /30&nbsp;个文件</div>*/}
                    <div>已上传
                        { haveUploadFiles.length }
                        个文件,</div>
                    <div>&nbsp;&nbsp;上传成功
                        <div style = {{display : 'inline-block',color : '#00B365'}}>{ uploadedSuccessful }</div>
                        个,</div>
                    <div>&nbsp;&nbsp;上传失败
                        <div style = {{display : 'inline-block',color : '#f5483B'}}>{ uploadedFailed }</div>
                        个</div>
                </div>}
                <div className={currentStyles.rightContent}>
                  {/*<Table columns = {columns}*/}
                  {/*       dataSource={haveUploadFiles ? haveUploadFiles: []}*/}
                  {/*       pagination={false}*/}
                  {/*       // loading = {dataLoading}*/}
                  {/*       // rowKey = {record=>record.id}*/}
                  {/*       // rowSelection = { rowSelection }*/}
                  {/*       // onRow = {onRow}*/}
                  {/*       // onChange={reactSorter}*/}
                  {/*></Table>*/}

                    <div className = {currentStyles.columnsName}>
                        <div className = {currentStyles.columnFileName}  style={{color : 'rgba(0, 0, 0, 0.6)'}}>文件名</div>
                        <div className = {currentStyles.columnFileName}  style={{color : 'rgba(0, 0, 0, 0.6)'}}>地址</div>
                        <div className = {currentStyles.columnStatus}  style={{color : 'rgba(0, 0, 0, 0.6)'}}>状态</div>
                        <div className = {currentStyles.columnOption} style={{color : 'rgba(0, 0, 0, 0.6)'}}>操作</div>
                    </div>
                    <div className={currentStyles.columnsContent}>
                        <br/>



                        {haveUploadFiles && haveUploadFiles.length > 0 && haveUploadFiles.map((item : any, itemIndex : number)=>{

                            if (item.children) {
                                return (<div className = {currentStyles.folderItem}>
                                    <DirectoryTree
                                        multiple
                                        selectable={false}
                                        treeData = {[item]}
                                    />
                                </div>)
                            }else{
                                return (<div className = {currentStyles.item}>
                                    <div className = {currentStyles.columnFileName}><img src='/src/icons/file.svg' />&nbsp;&nbsp;{item.name}</div>
                                    <div className = {currentStyles.columnFileName}>&nbsp;&nbsp;&nbsp;&nbsp;{item.params.path}</div>
                                    <div className = {currentStyles.columnStatus}>&nbsp;&nbsp;{item.hasUploaded === 1 ?
                                        (<div className={currentStyles.uploadStatus}><img src="/src/icons/pending.png" alt=""/>上传中</div>) :
                                        (item.hasUploaded === 2 ? (<div className={currentStyles.uploadStatus}><img src="/src/icons/pending.png" alt=""/>等待中</div>) :
                                            (item.hasUploaded === 3 ? (<div className={currentStyles.uploadStatus}><div className={currentStyles.greenCircle}></div>上传成功</div>) :
                                                    (<div className={currentStyles.uploadStatus}><div className={currentStyles.redCircle}></div>上传失败</div>)
                                            )
                                        )
                                        }</div>
                                    <div className = {currentStyles.columnOptionButtons}>
                                        {item.hasUploaded === 4 && <div className = {currentStyles.columnOption1}
                                        onClick = {()=>renewUpload(item, itemIndex)}> 重新上传 </div>}
                                        <div className = {currentStyles.columnOption}
                                             onClick = { ()=>deleteSingleFile(itemIndex) }
                                        >删除</div>
                                    </div>

                                </div>)
                            }

                        })}
                    </div>

                </div>
            </div>
        </div>
    </div>)
}
export  default InputInfoConfig;

