// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Utils } from "../Utils";

// { playerId: topic}
const TopicConfigs = {
    "0": [{
        id: 0,
        title: "小明要到马路对面，小明该走哪条路线呢？",
        // options: ["A", "B"],
        answers: [0],
        bgId: 0,
        optionId: 0
    },
    {
        id: 1,
        title: "信号灯是哪种状态时，小明可以过斑马线？",
        // options: ["A", "B", "C"],
        answers: [0],
        bgId: 0,
        optionId: 1
    },
    {
        id: 2,
        title: "公园就在马路对面了，小明可以选择哪条路线过马路？",
        // options: ["A", "B"],
        answers: [1],
        bgId: 1,
        optionId: 2
    }],
    "1": [{
        id: 0,
        title: "马路边停车两辆车，小朋选择乘坐哪辆车去公园？",
        // options: ["A", "B"],
        answers: [1],
        bgId: 2,
        optionId: 3
    },
    {
        id: 1,
        title: "小朋应该选择坐在哪个位置？",
        // options: ["A", "B", "C"],
        answers: [1, 2],
        bgId: 3,
        optionId: 4
    },
    {
        id: 2,
        title: "在车内时，哪种行为小朋可以做的？",
        // options: ["A", "B", "C"],
        answers: [0],
        bgId: 3,
        optionId: 5
    },
    {
        id: 3,
        title: "到公园了，小朋可以从那边下车？",
        // options: ["A", "B"],
        answers: [1],
        bgId: 4,
        optionId: 6
    }]
}

const PlayersConfig = [
    {
        id: 0,
        name: "小明",
        info: "“我要步行到公园”",
        isArrive: false
    },
    {
        id: 1,
        name: "小朋",
        info: "“我要乘车到公园”",
        isArrive: false
    }
]

enum allGameString {
    /**
     * `“{0}还没到，我等等他，他会选择什么方式到公园呢？”`
     */
    str0 = `“{0}还没到，我等等他，他会选择什么方式到公园呢？”`,
    /**
     * `揭晓{0}出行方式`,
     */
    str1 = `揭晓{0}出行方式`,
}

export class Constants {
    // 请求评估统计给后台在游戏结束时
    static AssessStatisticsJson: string;

    static storeParmForAssessStatistics() {
        this.AssessStatisticsJson = JSON.stringify(Utils.getParmFromURL(window.location.href));
    }

    static getConfigById(id) {
        return TopicConfigs[id];
    }

    static getConfigLength(id) {
        return TopicConfigs[id].length;
    }

    static getPlayerById(id) {
        return PlayersConfig[id];
    }

    static allGameString = allGameString;
}

