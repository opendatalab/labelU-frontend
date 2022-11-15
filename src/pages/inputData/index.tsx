import React from 'react';
import currentStyles from './index.module.scss';
import { Upload } from 'antd';
const InputInfoConfig = ()=>{
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
                        <Upload action = '/'>
                            上传文件
                        </Upload>
                        <Upload directory>
                            上传文件夹
                        </Upload>
                    </div>
                    <div className= { currentStyles.illustration }>
                        支持jpg、png、bmp、gif、mp4、wav、mp3、cav、txt、json、pcd、bin等文件
                        \n 建议单个文件大小不超过200mb
                    </div>
                </div>
            </div>
            <div className={currentStyles.right}>

            </div>
        </div>
    </div>)
}
export  default InputInfoConfig;