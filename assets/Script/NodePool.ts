// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass("NodePool")
export class NodePool {
    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(cc.Integer)
    size: number = 0;

    private _pool: cc.NodePool = null;

    init() {
        if (!this._pool) {
            this._pool = new cc.NodePool();
        }
        for (let i = 0; i < this.size; i++) {
            let node = cc.instantiate(this.prefab);
            this._pool.put(node);
        }
    }

    requestPool() {
        let node = null;
        if (this._pool.size() > 0) {
            node = this._pool.get();
        } else {
            node = cc.instantiate(this.prefab);
        }
        return node;
    }

    returnPool(node) {
        this._pool.put(node)
    }
}
