import React, { useState } from 'react';
import currentStyles from './index.module.scss';
import { Upload, Form } from 'antd';
import type { UploadProps } from 'antd';
import { FileAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import CommonController from "../../utils/common/common";
import { uploadFile as uploadFileService } from "../../services/createTask";

const InputInfoConfig = ()=>{
    const [fileList, setFileList] = useState<UploadFile[]>([{
        uid : '-1',
        name : '1.png',
        status : 'done',
        url : 'http://www.baidu.com/1.png'
    }]);
    const [aa, setAa] = useState("./");
    const [fileUploadProps, setFileUploadPros] = useState<any>({
        // action : '/api/v1/tasks/1/upload',
        // action : '',
        // data : { path : currentPath},
        // onChange : CommonController.debounce(handleChange, 1000),
        // multiple : true,
        // showUploadList : false
    });
    const handleChange : UploadProps['onChange'] = (info)=>{
        let newFileList = [...info.fileList];
        console.log(newFileList);
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
        console.log(value);
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
    const newCustomRequest = (info : any)=>{
        console.log(info.file)
        uploadFileService(1, {path : './', file : info.file  }).then((res)=>{

        })
    }
    const [folderFilePath, setFolderFilePath] = useState(1);
    const handleUploadFolderChange : UploadProps['onChange']  = (info)=>{
        let newFileList = [...info.fileList];
        // console.log(info);
        // console.log(newFileList);
        // setFileList(fileList.concat(newFileList));
        // console.log(fileList)
        for (let fileIndex = 0; fileIndex < newFileList.length; fileIndex++) {
            // setFolderFilePath(newFileList[0].originFileObj?.webkitRelativePath);
            setFolderFilePath(folderFilePath+1);
            // newFileList
        }
        // setAa(aa+1);
    }
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
                                data = {{path : aa}}
                                fileList = {fileList}
                                maxCount = {1}
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
                                    data = {{path : folderFilePath}}
                                    fileList = {fileList}
                                    maxCount = {1}
                                    onChange = { handleUploadFolderChange }
                                    multiple =  {true}
                                    showUploadList = {false}

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
                        {items.map((item : any)=>{
                            return (<div className = {currentStyles.item}>
                                <div className = {currentStyles.columnFileName}>test1tes1.txttxt</div>
                                <div className = {currentStyles.columnStatus}>未完成</div>
                                <div className = {currentStyles.columnOption}>删除</div>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export  default InputInfoConfig;