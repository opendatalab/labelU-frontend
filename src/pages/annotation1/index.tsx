import React, { FC, useEffect, useState } from 'react';
import Annotation from '../../components/business/annotation';
import { fileList as mockFileList, videoList } from '../../mock/annotationMock';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateToolsConfig,
    updateTagConfigList,
    updateAllAttributeConfigList,
    updateTextConfig,
} from '../../stores/toolConfig.store';

import toolCombineConfig from '../../config/toolCombineConfig.json';
const AnnotationPage: FC = () => {
    console.log(1111111)
    const dispatch = useDispatch();
    const { tools, tagList, attribute, textConfig } = useSelector(state => state.toolsConfig);
    // const currentIsVideo = StepUtils.currentToolIsVideo(1, stepConfig);
    const currentIsVideo = false;
    const [fileList, setFileList] = useState<any[]>([]);
    // 加载工具配置信息 和 文件信息
    useEffect(() => {
        // 工具配置 todo=》补充配置拉取接口
        // @ts-ignore
        dispatch(updateToolsConfig(toolCombineConfig.tools));
        dispatch(updateTagConfigList(toolCombineConfig.tagList));
        dispatch(updateAllAttributeConfigList(toolCombineConfig.attribute));
        // @ts-ignore
        dispatch(updateTextConfig(toolCombineConfig.textConfig));
        // 配置标注文件 todo=》补充文件拉取接口
        let fList: any[] = (currentIsVideo ? videoList : mockFileList).map((url, i) => ({
            id: i + 1,
            url,
            result: JSON.stringify([])
        }));
        setFileList(fList);
    }, []);

    const goBack = (data: any) => {
        console.log('goBack', data);
    };
    const leftSiderContent = ()=>{
        return (<div>test 22</div>)
    };
    const topActionContent = ()=>{
        return <div>test action</div>
    };
    return (
        <>
            {fileList && fileList.length > 0 && tools && tools.length > 0 && (
                <div style = {{width : '1440px'}}>
                    <Annotation
                        leftSiderContent = { leftSiderContent() }
                        topActionContent = { topActionContent() }
                        attribute={attribute}
                        tagList={tagList}
                        fileList={fileList}
                        textConfig={textConfig}
                        goBack={goBack}
                        tools={tools}
                    />
                </div>
            )}
        </>
    );
};

export default AnnotationPage;