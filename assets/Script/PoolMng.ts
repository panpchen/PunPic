// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NodePool } from "./NodePool";
import Virus from "./Virus";


const { ccclass, property } = cc._decorator;

@ccclass
export default class PoolMng extends cc.Component {
    @property(NodePool)
    virusPool: NodePool = null;
    @property(NodePool)
    scorePool: NodePool = null;

    init() {
        this.virusPool.init();
        this.scorePool.init();
    }

    createVirus() {
        return this.virusPool.requestPool();
    }

    returnVirusPool(node) {
        this.virusPool.returnPool(node);
    }

    showScore() {
        return this.scorePool.requestPool();
    }

    returnScorePool(node) {
        this.scorePool.returnPool(node);
    }
}
