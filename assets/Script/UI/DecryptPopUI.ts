// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "./BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DecryptPopUI extends BaseUI {
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Animation)
    aniList: cc.Animation[] = [];

    init(itemData) {
        this.label.string = itemData.descripe;
        this.aniList.forEach((ani, index) => {
            ani.node.active = index == itemData.id;
            if (ani.node.active) {
                ani.stop();
                ani.play();
            }
        });
    }
}
