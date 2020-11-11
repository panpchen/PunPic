// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import { ItemConfig } from "./Config/ItemConfig";
import { UIManager, UIType } from "./UIManager";
import Tips from "./Tips";

//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Sprite)
    itemBg: cc.Sprite = null;
    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;
    @property(cc.Node)
    answerBtn: cc.Node = null;
    @property(cc.Toggle)
    toggleList: cc.Toggle[] = [];
    @property(cc.Animation)
    flipAni: cc.Animation = null;
    @property(cc.Node)
    flipContent: cc.Node = null;
    @property(cc.Node)
    gameNode: cc.Node = null;

    private _lastSelectItemNameDic = [];
    private _curItemId: number = 0;
    private _itemData = null;
    private _isAgain: boolean = false;
    private _curSelectCount: number = 0;
    public static instance: Game = null;

    onLoad() {
        Game.instance = this;
        this.gameNode.active = false;
        cc.director.on("gameStart", this._startGame.bind(this));
        this.flipAni.on('finished', this._onFlipOver, this);
    }

    _startGame(isAgain: boolean = false) {
        this._isAgain = isAgain;
        this.gameNode.active = true;
        this.flipContent.scale = 1;
        this.answerBtn.active = this._isAgain;
        cc.tween(this.answerBtn)
            .repeatForever(
                cc.tween()
                    .to(0.3, { angle: -20 })
                    .to(0.3, { angle: 20 })

            )
            .start();
        this._curItemId = 0;
        this._curSelectCount = 0;
        this.updateContent();
    }

    onToggleEvent(toggle: cc.Toggle, index) {
        if (!this._lastSelectItemNameDic[this._curItemId]) {
            this._lastSelectItemNameDic[this._curItemId] = [];
        }

        const name = ItemConfig.getItemConfigById(this._curItemId).options[index];
        const nameLabel = toggle.node.getChildByName("name");
        let arr = this._lastSelectItemNameDic[this._curItemId];

        if (toggle.isChecked) {
            nameLabel.color = cc.Color.WHITE;
            arr.push(name);
            this._curSelectCount++;
        } else {
            nameLabel.color = cc.color(52, 52, 52, 255);
            const delIndex = arr.indexOf(name);
            arr.splice(delIndex, 1);
            this._curSelectCount--;
        }
    }

    onClickDecrypt() {
        this._itemData = ItemConfig.getItemConfigById(this._curItemId);
        UIManager.instance.showUI(UIType.DecryptPopUI, this._itemData);
    }

    onClickContinue() {
        if (this._curSelectCount == 0) {
            Tips.instance.showTips(" 至少选1个哦");
            return;
        }
        this.flipAni.play();
    }

    _onFlipOver() {
        this.flipContent.setPosition(cc.v2(0, -220));
        this.resetAllToggle();
        this._curSelectCount = 0;

        if (this._curItemId >= ItemConfig.getItemsLength() - 1) {
            this._curItemId = 0;
            if (this._isAgain) {
                UIManager.instance.showUI(UIType.ResultUI);
            } else {
                UIManager.instance.showUI(UIType.AgainUI);
            }
        } else {
            this._curItemId++;
            cc.tween(this.itemBg.node)
                .to(0.2, { position: cc.v3(0, 1000) })
                .call(() => {
                    this.updateContent();
                    this.flipContent.scale = 1;
                    this.itemBg.node.setPosition(cc.v2(0, -150));
                })
                .to(0.2, { position: cc.v3(0, 370) })
                .start()
        }
    }

    updateContent() {
        this._itemData = ItemConfig.getItemConfigById(this._curItemId);
        this.itemBg.spriteFrame = this.atlas.getSpriteFrame(this._itemData.id.toString());
        this.itemBg.node.scale = this._itemData.size;
        this.toggleList.forEach((toggle, id) => {
            toggle.node.getChildByName("name").getComponent(cc.Label).string = this._itemData.options[id];
        });

        const arr = this._lastSelectItemNameDic[this._curItemId];
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < this.toggleList.length; j++) {
                    const toggle = this.toggleList[j];
                    const tarName = toggle.node.getChildByName("name").getComponent(cc.Label).string;
                    if (arr[i] == tarName) {
                        toggle.isChecked = true;
                        this._curSelectCount++;
                        toggle.node.getChildByName("name").color = cc.Color.WHITE;
                    }
                }
            }
        }
    }

    resetAllToggle() {
        this.toggleList.forEach(toggle => {
            toggle.interactable = true;
            toggle.isChecked = false;
            toggle.node.getChildByName("name").color = cc.color(52, 52, 52, 255);
        });
    }

    clear() {
        this._curItemId = 0;
        this._isAgain = false;
        this._lastSelectItemNameDic = [];
        this.gameNode.active = false;
        this._curSelectCount = 0;
        this.answerBtn.active = false;
    }
}
