import fs from "fs";
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const _url = fileURLToPath(import.meta.url);
const __dirname = dirname(_url);

// 发布订阅模式 目的是 每次读取完毕后可以做一些事情
// 1、读完做操作
// 2、全部读完后做操作

// 发布和订阅是解耦的 
// 多对多的关系

class Action {
    #task = []; //es13写法 私有变量
    #person = {};
    on(fn) {
        this.#task.push(fn);
    }
    emit(key, value) {
        this.#person[key] = value;
        this.#task.forEach((fn) => {
            fn(this.#person);
        })
    }
}

const action = new Action();

action.on((data) => {
    console.log("每一次触发", data)
})
action.on((data) => {
    if (Reflect.ownKeys(data).length === 2) {
        console.log("完成", data)
    }
})

fs.readFile(resolve(__dirname, 'age.txt'), 'utf-8', function (err, data) {
    action.emit('age', data);
})
fs.readFile(resolve(__dirname, 'name.txt'), 'utf-8', function (err, data) {
    action.emit('name', data);
})