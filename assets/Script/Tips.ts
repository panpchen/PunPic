// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tips extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Node)
    bg: cc.Node = null;

    private _isPlayOver = true;
    public static instance: Tips = null;

    onLoad() {
        Tips.instance = this;
        this.bg.active = false;
    }

    showTips(str) {
        if (!this._isPlayOver) {
            return;
        }
        this._isPlayOver = false;
        this.bg.active = true;
        this.bg.setPosition(cc.v2(0, 0));
        this.bg.opacity = 255;
        this.bg.scale = 1;
        this.label.string = str;
        cc.tween(this.bg)
            .parallel(
                cc.tween().to(0.2, { scale: 1.2 }),
                cc.tween().to(0.2, { position: cc.v3(this.bg.x, this.bg.y + 50) })
            )
            .delay(0.5)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this._isPlayOver = true;
            })
            .start();
    }

}
