import React, { useState, useEffect } from 'react';
import currentStyles from './index.module.scss';
import { Upload, Form } from 'antd';
import type { UploadProps } from 'antd';
import { FileAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import CommonController from "../../utils/common/common";
import { uploadFile as uploadFileService } from "../../services/createTask";

import { Tree } from 'antd';

let newFileList : any[] = [];
let newFileListInfo : any[] = [];
const InputInfoConfig = ()=>{
    const { DirectoryTree } = Tree;
    const treeData = [{
        title : 'parent 0',
        key : '0-0',
        children : [
            {
                title : 'leaf 0-0',
                key : '0-0-0',
                children : [
                    {
                        title : 't1',
                        key : '0-0-0-1',
                        children : [{
                            title : 't2',
                            key : '0-0-0-2',
                            children : [{
                                title : (<div className = {currentStyles.itemInFolder}>
                                    <div className = {currentStyles.columnFileName}>{121241324}</div>
                                    <div className = {currentStyles.columnStatus}>已上传</div>
                                    <div className = {currentStyles.columnOption}
                                    >删除</div>
                                </div>),
                                key : '0-0-0-3',
                                isLeaf : true
                            }]
                        }]
                    }
                ]
            }
        ]
    }];

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [aa, setAa] = useState("./");
    const [fileUploadProps, setFileUploadPros] = useState<any>({
        // action : '/api/v1/tasks/1/upload',
        // action : '',
        // data : { path : currentPath},
        // onChange : CommonController.debounce(handleChange, 1000),
        // multiple : true,
        // showUploadList : false
    });
    const [haveUploadFiles, setHaveUploadFiles] = useState<any[]>([]);
    const handleChange : UploadProps['onChange'] = (info)=>{
        let newFileList1 = [...info.fileList];
        // console.log(newFileList1);
        newFileList = newFileList1;
        // newFileList = newFileList.slice(-2);
        // newFileList = newFileList.map(file=>{
        //     if (file.response) {
        //         file.url = file.response.url;
        //     }
        //     return file;
        // })

        // setFileList(newFileList);
        // setFileUploadPros({
        //         // action : '/api/v1/tasks/1/upload',
        //         action : '',
        //         data : { path : a++},
        //         // onChange : CommonController.debounce(handleChange, 1000),
        //         // multiple : true,
        //         // showUploadList : false
        // })
        // setTimeout(()=>{
        //
        // },)

        // uploadFileService(1, {path : './', file : info.file  }).then((res)=>{
        //
        // })

        // setAa("./");
    }
    const [currentPath, setCurrentPath] = useState('./');
    // const fileUploadProps = {
    //     // action : '/api/v1/tasks/1/upload',
    //     action : '',
    //     // data : { path : currentPath},
    //     onChange : CommonController.debounce(handleChange, 1000),
    //     multiple : true,
    //     showUploadList : false
    // }


    const finishUpload = (values : any)=>{
        console.log(values);
    }

    const [flag, setFlag] = useState(true);

    const beforeUploadFolder = (value : any)=>{
        // console.log(value);
        setCurrentPath(value.webkitRelativePath);
        return false;
        if (flag) {
            return true;
        }else{
            return false;
        }
    }

    const customRequest = (v:any)=>{
        console.log(v)
    }
    const uploadFileChange = (k:any)=>{
        console.log(k)
    }
    const items = [{
        fileName : 'test1.txt',
        status : 0,
        option : ()=>{
            console.log('delete');
        }
    }];
    const [uploadCount, setUploadCount] = useState(0);
    const isCorrectFiles = (files : any)=>{
        let result = true;
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            let file = files[fileIndex].file;
            let isOverSize = CommonController.isOverSize(file.size);
            if(isOverSize) {result = false;break;}
            let isCorrectFileType = CommonController.isCorrectFileType(file.name);
            if(!isCorrectFileType) {result = false;break;}
        }
        return result;
    }
    const newCustomRequest = async function (info : any){
        console.log(newFileList);
        console.log(info)
        newFileListInfo.push(info);
        console.log(newFileListInfo)
        if (newFileListInfo.length === newFileList.length) {
            let isCorrectCondition = isCorrectFiles(newFileListInfo);
            if(!isCorrectCondition){
                CommonController.notificationErrorMessage({message : '请重新选择合适的文件'}, 2);
                newFileList = [];
                newFileListInfo = [];
                return;
            }
            // setHaveUploadFiles(haveUploadFiles.concat(newFileListInfo));
            let currentHaveUploadFiles = [];
            console.log(newFileListInfo);
            for (let newFileListInfoIndex = 0; newFileListInfoIndex < newFileListInfo.length; newFileListInfoIndex++) {

                let currentInfo =  newFileListInfo[newFileListInfoIndex];
                console.log(currentInfo);
                let result = await uploadFileService(1, {path : './', file : currentInfo.file  });
                // console.log(2);
                console.log(result);
                if (result?.status === 201) {
                    currentHaveUploadFiles.push({name : currentInfo.file.name,
                        size : currentInfo.file.size,
                        hasUploaded : true,
                        uploadId : result?.data.data.id});
                    // setHaveUploadFiles(haveUploadFiles.concat([{name : currentInfo.file.name,
                    //     size : currentInfo.file.size,
                    //     hasUploaded : true,
                    // uploadId : result?.data.data.id}]))
                }else{
                    currentHaveUploadFiles.push({name : currentInfo.file.name,
                        size : currentInfo.file.size});
                    // setHaveUploadFiles(haveUploadFiles.concat([{name : currentInfo.file.name,
                    //     size : currentInfo.file.size}]))
                }
                setHaveUploadFiles(haveUploadFiles.concat(currentHaveUploadFiles))
                // console.log(result);
            }
            newFileList = [];
            newFileListInfo = [];
        }


        // uploadFileService(1, {path : './', file : info.file  }).then((res)=>{
        //
        // })
    }
    const [folderFilePath, setFolderFilePath] = useState(1);
    const handleUploadFolderChange : UploadProps['onChange']  = (info)=>{
        // let newFileList = [...info.fileList];
        // for (let fileIndex = 0; fileIndex < newFileList.length; fileIndex++) {
        //     // setFolderFilePath(newFileList[0].originFileObj?.webkitRelativePath);
        //     setFolderFilePath(folderFilePath+1);
        //     // newFileList
        // }
        // setAa(aa+1);

        let newFileList1 = [...info.fileList];
        // console.log(newFileList1);
        newFileList = newFileList1;

    }

    const deleteUploadFiles = ()=>{
        console.log(1)
    }
    useEffect(()=>{
        console.log(haveUploadFiles)
    },[haveUploadFiles]);
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
                                <FileAddOutlined style={{color : '#FFFFFF'}} />
                                <div style = {{display : 'inline-block', color : '#FFFFFF'}}>上传文件</div>
                            </Upload>
                        </div>
                        <div className = { currentStyles.uploadFolderButton }>
                            {/*<div className = {currentStyles.uploadIcon}></div>*/}

                            <Upload directory
                                // customRequest={customRequest}
                                //     beforeUpload={beforeUploadFolder}
                                // onChange={uploadFileChange}

                                    action = {'/api/v1/tasks/1/upload'}
                                    // data = {{path : folderFilePath}}
                                    fileList = {fileList}
                                    // maxCount = {1}
                                    onChange = { handleUploadFolderChange }
                                    multiple =  { true }
                                    showUploadList = { false }
                                    customRequest={ newCustomRequest }
                            >
                                <FolderOpenOutlined style = {{color : '#1b67ff'}}/>
                                <div style = {{display : 'inline-block', color : '#1b67ff'}}>上传文件夹</div>
                            </Upload>
                        </div>
                    </div>
                    <div className= { currentStyles.illustration }>
                        <div className = { currentStyles.supportType }>&nbsp;支持jpg、png、bmp、gif、mp4、wav、&nbsp;&nbsp;mp3、cav、txt、&nbsp;&nbsp;json、pcd、bin等文件
                        </div>
                        <div className = { currentStyles.advises }> 建议单个文件大小不超过200mb </div>
                    </div>
                </div>
            </div>
            <div className={currentStyles.right}>
                <div className={currentStyles.rightTitle}>
                    <div className = {currentStyles.rightTitleLeft}>上传列表</div>
                    <div className = {currentStyles.rightTitleRight}>正在上传&nbsp;
                        <div  className = {currentStyles.rightTitleRightHight}>10</div>
                        /30&nbsp;个文件</div>
                </div>
                <div className={currentStyles.rightContent}>
                    <div className = {currentStyles.columnsName}>
                        <div className = {currentStyles.columnFileName}  style={{color : 'rgba(0, 0, 0, 0.6)'}}>文件名</div>
                        <div className = {currentStyles.columnStatus}  style={{color : 'rgba(0, 0, 0, 0.6)'}}>状态</div>
                        <div className = {currentStyles.columnOption} style={{color : 'rgba(0, 0, 0, 0.6)'}}>操作</div>
                    </div>
                    <div className={currentStyles.columnsContent}>
                        <br/>



                        {haveUploadFiles.map((item : any)=>{
                            console.log(item)
                            return (<div className = {currentStyles.item}>
                                <div className = {currentStyles.columnFileName}>{item.name}</div>
                                <div className = {currentStyles.columnStatus}>{item.hasUploaded ? '已上传' : '上传失败'}</div>
                                <div className = {currentStyles.columnOption}
                                >删除</div>
                            </div>)
                        })}
                        <div className = {currentStyles.folderItem}>
                            <DirectoryTree
                                multiple
                                treeData = {treeData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export  default InputInfoConfig;