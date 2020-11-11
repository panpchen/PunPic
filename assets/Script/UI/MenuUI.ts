// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "./BaseUI";
import { UIManager } from "../UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuUI extends BaseUI {
    init(data) {
        super.init(data);
        this.isAni = false;
    }

    clickGameStart() {
        UIManager.instance.hideAll();
        cc.director.emit("gameStart");
    }
}
