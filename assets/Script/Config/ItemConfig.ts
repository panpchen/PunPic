// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const ItemsConfigs = [
    {
        id: 0,
        options: ["老奶奶", "树叶", "少女", "花"],
        descripe: "少女，老奶奶",
        size: cc.v2(1.1, 1.1)
    },
    {
        id: 1,
        options: ["手", "纸张", "杯子", "少女"],
        descripe: "手，少女",
        size: cc.v2(1.3, 1.3)
    },
    {
        id: 2,
        options: ["刀片", "杯子", "人脸", "柱子"],
        descripe: "杯子，人脸",
        size: cc.v2(1.3, 1.3)
    },
    {
        id: 3,
        options: ["青蛙", "马头", "草丛", "石头"],
        descripe: "青蛙，马头",
        size: cc.v2(2, 2)
    },
    {
        id: 4,
        options: ["树枝", "骨头", "鸟", "兔子"],
        descripe: "鸟，兔子",
        size: cc.v2(1.5, 1.5)
    },
]

export class ItemConfig {

    static getItemConfigById(id) {
        return ItemsConfigs[id];
    }

    static getItemsLength() {
        return ItemsConfigs.length;
    }
}

