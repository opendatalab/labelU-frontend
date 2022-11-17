import React, { useState } from 'react';
import currentStyles from './index.module.scss';
import { Upload, Form } from 'antd';
import type { UploadProps } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
const InputInfoConfig = ()=>{
    const [fileList, setFileList] = useState<UploadFile[]>([{
        uid : '-1',
        name : '1.png',
        status : 'done',
        url : 'http://www.baidu.com/1.png'
    }]);
    const handleChange : UploadProps['onChange'] = (info)=>{
        let newFileList = [...info.fileList];
        console.log(newFileList);
        // newFileList = newFileList.slice(-2);
        newFileList = newFileList.map(file=>{
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        })
        setFileList(newFileList);
        // setTimeout(()=>{
        //
        // },)
    }
    const [currentPath, setCurrentPath] = useState('./');
    const fileUploadProps = {
        action : '/api/v1/tasks/1/upload',
        // action : '',
        data : { path : currentPath},
        onChange : handleChange,
        multiple : true
    }

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
                        <div className = {currentStyles.uploadIcon}></div>
                        {/*<Upload {...fileUploadProps} fileList={fileList} maxCount={1}>*/}
                        {/*    <FileAddOutlined />*/}
                        {/*    上传文件*/}
                        {/*</Upload>*/}

                        <Upload directory {...fileUploadProps}
                        // customRequest={customRequest}
                            beforeUpload={beforeUploadFolder}
                                // onChange={uploadFileChange}
                        >
                            上传文件夹
                        </Upload>
                    </div>
                    <div className= { currentStyles.illustration }>
                        支持jpg、png、bmp、gif、mp4、wav、mp3、cav、txt、json、pcd、bin等文件
                        <br/> 建议单个文件大小不超过200mb
                    </div>
                </div>
            </div>
            <div className={currentStyles.right}>

            </div>
        </div>
    </div>)
}
export  default InputInfoConfig;