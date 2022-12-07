import  axiosProxy from './axiosProxy';
import commonController from "../utils/common/common";
const { axiosInstance } = axiosProxy;
const createSamples = async function (taskId : number,data : any){
    // try {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples`,
        method : 'POST',
        data
    });
    return res;
    // }catch (e) {
    //     CommonController.notificationErrorMessage(e, 5);
    // }
}

const getTask = async function(taskId : number){
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}`,
        method : 'GET',
      params : {
          task_id : taskId
      }
    });
    return res;
}

const getSamples = async function (taskId : number, params : any) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples`,
        method : 'GET',
        params
    });
    return res;
}

const getPrevSamples = async function (taskId : number, params : any) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples`,
        method : 'GET',
        params
    });
    return res;
}


const getSample = async function (taskId : number, sampleId : number) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples/${sampleId}`,
        method : 'GET'
    });
    return res;
}

const updateSampleState = async function (taskId : number, sampleId : number, data : any) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples/${sampleId}`,
        method : 'PATCH',
        params : {
          sample_id : sampleId
        },
        data : {
            state : "SKIPPED",
            data
        }
    });
    return res;
}

const updateSampleAnnotationResult = async function (taskId : number, sampleId : number,
                                                     data : any) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples/${sampleId}`,
        method : 'PATCH',
        params : {
            sample_id : sampleId
        },
        data : {
            data : data.data,
            // state : data.state
        }
    });
    return res;
}
const outputSample = async function (taskId : number, sampleIds : any, activeTxt : string) {
  let res = await axiosInstance({
    url : `/api/v1/tasks/${taskId}/samples/export`,
    method : 'POST',
    params : {
      task_id :taskId,
      export_type : activeTxt
    },
    data : {
      sample_ids : sampleIds
    }
  })
    let data = res;
    // @ts-ignore
    // res.blob().then(blob=>console.log(blob));
    // res.blob().then(blob => {
    // let afString = res.headers['content-disposition'].split(';')[1].split('=')[1];
    // afString = afString.slice(1,-1);
    // let blobUrl = 'blob:'+window.location.origin + '/'+ afString;
    // console.log(blobUrl);
    console.log(data);
    const blobData = new Blob([JSON.stringify(data.data)]);
    let url = window.URL.createObjectURL(blobData);
    const a = document.createElement('a');
    let taskRes = await getTask(taskId);
    let filename = taskRes.data.data.name;
    switch(activeTxt){
        case 'JSON' :
            filename = filename + '.json';
            break;
        case 'COCO' :
            filename = filename + '.coco';
            break;
        case 'MASK' :
            filename = filename + '.mask';
            break;
    }
    a.download = filename;
    a.href = url;
    a.click();

    // @ts-ignore
    // window.saveAs(blobData, 'dataTimestamp' + ".json");
    //     // const url = window.URL.createObjectURL(blobUrl);
    //     a.href = url;
    //     a.download = 'filename';
    //     a.click();
        // window.URL.revokeObjectURL(blobUrl);
    // })
  // commonController.downloadToFile(data, activeTxt);
    // return res;
}

const outputSamples = async function (taskId : number, activeTxt : string) {
  try{
    let samplesRes = await getSamples(taskId, {pageNo : 0, pageSize : 100000});
    let sampleIdArrays = samplesRes.data.data;
    let sampleIds = [];
    for (let sample of sampleIdArrays) {
      sampleIds.push(sample['id']);
    }
    if (sampleIds.length === 0) {
      commonController.notificationErrorMessage({message : '后端返回数据出现问题'}, 1)
      return;
    }
    let outputSamplesRes = await outputSample(taskId, sampleIds, activeTxt);
      console.log(outputSamplesRes);
    return true;
  }catch(error){
    commonController.notificationErrorMessage({message : error}, 1);
    return false;
  }
}

const deleteSamples = async function(taskId : number, sampleIds : number[]){
  let res = await axiosInstance({
    url : `/api/v1/tasks/${taskId}/samples`,
    method : 'DELETE',
    data : {
      sample_ids : sampleIds
    }
  })
  return res;
}

export {
    createSamples,
    getTask,
    getSamples,
    getSample,
    getPrevSamples,
    updateSampleState,
    updateSampleAnnotationResult,
    outputSample,
    outputSamples,
    deleteSamples
};
