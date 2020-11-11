// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// 进度条效果
cc.Class({
    extends: cc.Component,

    properties: {
        _callback: null
    },

    onLoad() {
        this.isLerp = false;
        this.timer = 0;
        this.lerpDuration = 0.2;
        this.ratio = 0;
        this.bar = this.node.getComponent(cc.Sprite);
    },

    updateProgress(ratio, callback) {
        this._callback = callback;
        this.ratio = ratio;
        this.timer = 0;
        this.isLerp = true;
    },

    update(dt) {
        if (!this.bar || !this.isLerp) {
            return;
        }

        this.timer += dt;
        if (this.timer >= this.lerpDuration) {
            this.timer = this.lerpDuration;
            this.isLerp = false;
        }

        this.bar.fillStart = cc.misc.lerp(this.bar.fillStart, this.ratio, this.timer / this.lerpDuration);
        this._callback && this._callback(this.bar.fillStart);
    }
});