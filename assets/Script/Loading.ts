import { Constants } from "./Config/Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Sprite)
    fillSp: cc.Sprite = null;

    onLoad() {
        cc.macro.ENABLE_MULTI_TOUCH = true;
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.preloadGameScene();

        Constants.storeParmForAssessStatistics();

        // manager.enabledDebugDraw = true;
        // cc.director.getPhysicsManager().enabled = true;
    }

    preloadGameScene() {
        cc.director.preloadScene('game', (completeCount, totalCount, item) => {
            let v = completeCount / totalCount;
            // this.fillSp.fillStart = v;
            this.fillSp.node.getComponent("progressBarMoveEffect").updateProgress(v, (num) => {
                this.fillSp.fillStart = num;
            });
        }, () => {
            cc.director.loadScene("game");
            cc.log('game scene preloaded');
        });
    }
}
