import { FC, useEffect, useState } from 'react';
import Annotation from '../../components/business/annotation';
import AnnotationOperation from '@label-u/components';
import './index.less';
// import { fileList as mockFileList, videoList } from '../../mock/annotationMock';
import YamlConfig from './yamlConfig';
import { shallowEqual, useSelector } from 'react-redux';
import { ToolsConfigState } from 'interface/toolConfig';
import { Button, Steps, Tabs } from 'antd';
import EmptyConfigImg from '../../img/annotationCommon/emptyConfig.png';
import ConfigTemplate from './configTemplate/index';
import FormConfig from './formConfig';
import { getSamples } from '../../services/samples'

const { Step } = Steps;

interface OneFile {
  id: number;
  url: string;
  result: string;
}

const defaultFile: OneFile = {
  id: 1,
  url: "/src/img/example/bear4.webp",
  result: "{}"
};

const AnnotationConfig: FC = () => {
  let taskId = parseInt(window.location.pathname.split('/')[2]);

  const [fileList, setFileList] = useState<OneFile[]>([defaultFile]);

  useEffect(() => {
    const loadFirstSample = async () => {
      const resp = await getSamples(taskId, { pageNo: 0, pageSize: 1 });
      const data = resp.data;
      const samples = data.data;
      if (samples != null && samples.length > 0) {
        const firstSample = samples[0];
        console.log(firstSample.data);

        // bad code
        const urls = firstSample.data.urls;
        if (urls != null) {
          const firstKey = Object.keys(urls)[0]
          const firstUrl = urls[firstKey];
          console.log(firstUrl);

          const oneFile: OneFile = {
            id: 1,
            url: firstUrl,
            result: "{}"
          }
          setFileList([oneFile]);
        }
      }
    }
    loadFirstSample();
  }, []);

  useEffect(() => {
    // run during mount

    return () => {
      // run during umount
      console.log('AnnotationConfig umounted');
    };
  }, []);

  // for future test only
  const [config, setConfig] = useState<ToolsConfigState>({
    tools: [],
    tagList: [],
    attribute: [],
    textConfig: [],
    commonAttributeConfigurable: false
  });


  const { tools, tagList, attribute, textConfig, commonAttributeConfigurable  } = useSelector(state => state.toolsConfig, shallowEqual);
  const [rightImg, setRightImg] = useState<any>();
  const [isConfigError, setIsConfigError] = useState<boolean>(false);

  const [force, forceSet] = useState(0);

  useEffect(() => {
    // ???????????????????????????
    const throttle = (fun: () => void, time: number) => {
      let timmer: any;
      let returnFunction = () => {
        if (timmer) {
          clearTimeout(timmer);
        }
        timmer = setTimeout(() => {
          fun();
        }, time);
      };
      return returnFunction;
    };
    // @ts-ignore
    window.throttle = throttle;
    setRightImg(EmptyConfigImg);
  }, []);

  useEffect(() => {
    // ????????????????????????
    forceSet(new Date().getTime());
  }, [attribute, tagList, textConfig, tools, commonAttributeConfigurable]);

  const goBack = (data: any) => {
    console.log('goBack', data);
  };

  const doSetImage = (img: any, isError: boolean) => {
    setRightImg(img);
    setIsConfigError(isError);
  };

  const extraContent = {
    left: <span className="leftTabContent">????????????</span>,
    right: <ConfigTemplate />
  };
  return (
    <div className="container">
      {/*<div className="headerBox">*/}
      {/*  <div className="stepBox">*/}
      {/*    <Steps size="small" current={2}>*/}
      {/*      <Step title="????????????" />*/}
      {/*      <Step title="????????????" />*/}
      {/*      <Step title="????????????" />*/}
      {/*    </Steps>*/}
      {/*  </div>*/}
      {/*  <div className="submitBox">*/}
      {/*    <Button>??????</Button>*/}
      {/*    <Button*/}
      {/*      type="primary"*/}
      {/*      onClick={e => {*/}
      {/*        e.stopPropagation();*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      ??????*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="configBox">
        <div className="leftSider" id="lefeSiderId">
          <div className="leftSiderTitle">
            <span className="leftTabContent">????????????</span>
            <ConfigTemplate />
          </div>
          <div className="leftPane">
            <FormConfig key={force} config={config} setConfig={setConfig} />
          </div>

          {/*<Tabs*/}
          {/*  defaultActiveKey="2"*/}
          {/*  tabBarExtraContent={extraContent}*/}
          {/*  type="card"*/}
          {/*  onChange={e => {*/}
          {/*    forceSet(new Date().getTime());*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Tabs.TabPane tab="YAML" key="1">*/}
          {/*    <div className="leftPane">*/}
          {/*      <YamlConfig toolsConfigState={confitState} doSetImg={doSetImage} key={force} />*/}
          {/*    </div>*/}
          {/*  </Tabs.TabPane>*/}
          {/*  <Tabs.TabPane tab="?????????" key="2" forceRender={true}>*/}
          {/*    <div className="leftPane">*/}
          {/*      <FormConfig key={force} />*/}
          {/*    </div>*/}
          {/*  </Tabs.TabPane>*/}
          {/*</Tabs>*/}

        </div>
        <div className="rightSider">
          {((fileList && fileList.length > 0 && tools && tools.length > 0) || !rightImg) && !isConfigError ? (
            <>
              <div className="rightHeader">
                <span className="leftSpan">????????????</span>
              </div>
              <div className='rightContent'>
                {/*<Annotation*/}
                {/*  isPreview={true}*/}
                {/*  attribute={attribute}*/}
                {/*  tagList={tagList}*/}
                {/*  fileList={fileList}*/}
                {/*  textConfig={textConfig}*/}
                {/*  goBack={goBack}*/}
                {/*  tools={tools}*/}
                {/*/>*/}
                <AnnotationOperation
                    isPreview={ true }
                    attributeList={commonAttributeConfigurable?attribute:[]}
                    tagConfigList={tagList}
                    imgList={fileList}
                    textConfig={textConfig}
                    goBack={goBack}
                    toolsBasicConfig={tools}
                />
              </div>
            </>
          ) : (
            <div className="notMatchBox">
              <img alt="not match config" src={rightImg} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnotationConfig;
