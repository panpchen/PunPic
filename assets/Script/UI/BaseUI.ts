// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseUI extends cc.Component {
    protected isAni: boolean = true;

    init(data = null) { }

    show(data) {
        this.init(data);
        this.node.active = true;
        if (this.isAni) {
            this.node.scale = 0;
            cc.tween(this.node)
                .to(.2, { scale: 1.1 }, { easing: 'sineOut' })
                .to(.2, { scale: 1 }, { easing: 'sineOut' })
                .start()
        }
    }

    hide() {
        if (this.isAni) {
            cc.tween(this.node)
                .to(0.14, { scale: 1.1 }, { easing: 'sineIn' })
                .to(0.14, { scale: 0 }, { easing: 'sineIn' })
                .call(() => {
                    this.node.active = false;
                })
                .start()
        } else {
            this.node.active = false;
        }
    }
}
