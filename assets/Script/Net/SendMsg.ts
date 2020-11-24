// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetManager } from "./NetManger";

const URL_LIST = {
  SaveAssessStatistics: "http://192.168.16.11:8081/question/saveAssessStatistics",
}

export class SendMsg {
  // 请求评估统计
  static reqSaveAssessStatistics(data: string, callback = null, errorCallback = null) {
    NetManager.send(URL_LIST.SaveAssessStatistics, "POST", data, (response) => {
      callback && callback(data);
    }, () => {
      errorCallback && errorCallback();
    });
  }
}