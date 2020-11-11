// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "./UI/BaseUI";

const { ccclass, property } = cc._decorator;
export const enum UIType {
    MenuUI = "MenuUI",
    AgainUI = "AgainUI",
    DecryptPopUI = "DecryptPopUI",
    ResultUI = "ResultUI"
}

@ccclass("AllUIMap")
export class AllUIMap {
    @property()
    name: string = "";

    @property(BaseUI)
    panel: BaseUI = null;
}

@ccclass
export class UIManager extends cc.Component {

    public static instance: UIManager = null;
    private _allPanel = new Map<string, BaseUI>();

    @property([AllUIMap])
    allUIMap: AllUIMap[] = [];

    onLoad() {
        UIManager.instance = this;
        for (let i = 0; i < this.allUIMap.length; i++) {
            let uiMap = this.allUIMap[i];
            this._allPanel.set(uiMap.name, uiMap.panel);
        }
        this.showUI(UIType.MenuUI);
        this.hideUI(UIType.AgainUI);
        this.hideUI(UIType.DecryptPopUI);
        this.hideUI(UIType.ResultUI);
    }

    showUI(type: UIType, data?) {
        if (this._allPanel.size == 0) {
            return;
        }
        const panel = this._allPanel.get(type);
        if (panel) {
            panel.show(data);
        }
    }

    hideUI(type: UIType) {
        if (this._allPanel.size == 0) {
            return;
        }
        const panel = this._allPanel.get(type);
        if (panel) {
            panel.hide();
        }
    }

    hideAll() {
        if (this._allPanel.size == 0) {
            return;
        }

        this._allPanel.forEach((value, key) => {
            value.hide();
        });
    }
}
