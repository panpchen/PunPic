// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export class Utils {
    // 格式化秒转换00:00
    static countDownFormat(sec: number) {
        let nowM = Math.floor(sec % 3600 / 60);
        let nowS = Math.floor(sec % 60);
        let nowMStr = nowM.toString();
        let nowSStr = nowS.toString();
        if (nowM < 10) {
            nowMStr = `0${nowM}`;
        }
        if (nowS < 10) {
            nowSStr = `0${nowS}`;
        }
        return nowMStr + ":" + nowSStr;
    }

    // 数组随机排序
    static getRandomList(list) {
        list.sort((a, b) => {
            return 0.5 - Math.random();
        });
        return list;
    }

    // 去重数组
    static getUniqueArray<T>(originArray: Array<T>): Array<T> {
        const result = originArray.filter((v, i, arr) => {
            return arr.indexOf(v, 0) === i;
        });
        return result;
    }

    // 获取范围内随机小数
    static getRangeRandom(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    // 获取范围内随机整数
    static getRangeRandomInteger(min, max) {
        const result = this.getRangeRandom(min, max);
        return Math.floor(result);
    }

    // 获取范围内随机不重复数组
    static getRandomArrayNoRepeat(min, max, arrayLength) {
        let n = 0;
        if (min <= 0) {
            n = Math.abs(min) + 1;
        }
        const array = new Array(max + n)
            .fill(0)
            .map((v, i) => i + min)
            .sort(() => 0.5 - Math.random())
            .filter((v, i) => v <= max + n && i < arrayLength);
        return array;
    }

    // 世界坐标转本地坐标
    static worldConvertLocalPointAR(node, worldPoint) {
        if (node) {
            return node.convertToNodeSpaceAR(worldPoint);
        }
        return null;
    }

    // 本地坐标转世界坐标
    static localConvertWorldPointAR(node) {
        if (node) {
            return node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        return null;
    }

    // 获取字符串中的数字
    static getNumberFromStr(str) {
        return str.replace(/[^0-9]/ig, "");
    }

    // 两个数组是否相同 只对数字
    static isEqualsArray(arr: Array<number>, arr2: Array<number>) {
        return JSON.stringify(arr.sort()) === JSON.stringify(arr2.sort());
    }

    // url参数 解析为一个对象
    static getParmFromURL(url: string) {
        // 先将字符串通过 split 方法，以 "?" 为分割符将其分割成数组；
        // 该数组有两个元素，第一个为空字符串，第二个为 url 参数字符串
        let arr = url.split('?')
        if (arr.length < 2) {
            cc.log("url缺少参数");
            return;
        }
        // 将参数字符串以 "&" 符号为分隔符进行分割
        let params = arr[1].split('&')
        // 定义一个数组用于存储参数
        let obj = {}
        // 通过循环将参数以键值对的形式存储在变量 obj 中
        for (let i = 0; i < params.length; i++) {
            let arr_params = params[i].split('=')
            obj[arr_params[0]] = arr_params[1]
        }
        return obj
    }

    static stringFormat(str: string, ...args: any[]) {
        for (let i = 0; i < args.length; i++) {
            let id = `{${i}}`;
            str = str.replace(id, args[i]);
        }
        return str;
    }
}
