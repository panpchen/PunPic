// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "./BaseUI";
import { UIManager, UIType } from "../UIManager";
import Game from "../Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultUI extends BaseUI {

    clickBackGame() {
        this.hide();
        Game.instance.clear();
        UIManager.instance.showUI(UIType.MenuUI);
    }
}
