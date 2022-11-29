import AnnotationOperation, { TextConfig } from '@label-u/components';

import '@label-u/components/dist/index.css';
// import LeftSider from './leftSider';
import { BasicConfig, Attribute, OneTag } from 'interface/toolConfig';
import React, { memo } from 'react';
// import tagConfigList from '../../../config/tagConfigList.json';
// import attributeList from '../../../config/attributeList.json';

const Annotation = (props: {
  fileList: any;
  goBack: (data: any) => void;
  tools: BasicConfig[];
  tagList: OneTag[];
  attribute: Attribute[];
  textConfig: TextConfig;
  isPreview?: boolean;
  leftSiderContent?: any;
  topActionContent?:any;
}) => {
  const { fileList, goBack, tools, tagList, attribute, textConfig, isPreview, leftSiderContent, topActionContent } = props;
  const exportData = (data: any) => {
    // console.log('exportData', data);
  };
  const onSubmit = (data: any) => {
    // 翻页时触发当前页面数据的输出
    // console.log('submitData', data);
  };
  // const leftSiderContent = ()=>{
  //   return (<div>test 22</div>)
  // };
  // const topActionContent = ()=>{
  //   return <div>test action</div>
  // };
  return (
    <div>
      <AnnotationOperation
          leftSiderContent = { leftSiderContent }
          topActionContent = { topActionContent }
        isPreview = {isPreview}
        exportData={exportData}
        onSubmit={onSubmit}
        imgList={fileList}
        attributeList={attribute}
        tagConfigList={tagList}
        toolsBasicConfig={tools}
        textConfig={textConfig}
        isShowOrder={false}
      />
    </div>
  );
};
export default memo(Annotation);
