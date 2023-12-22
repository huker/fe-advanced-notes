import fs from "fs";
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const _url = fileURLToPath(import.meta.url);
const __dirname = dirname(_url);

// fs.readFile(resolve(__dirname,'age.txt'),'utf-8',function(err,data){
//     console.log(data)
// })

// fs.readFile(resolve(__dirname,'name.txt'),'utf-8',function(err,data){
//     console.log(data)
// })

// 方法一 回调收集 匹配 ，写的比较死，而且有外部作用域的变量
const person = {};
function cb(key, value) {
    person[key] = value;
    if (Reflect.ownKeys(person).length === 2) {
        console.log(person)
    }
}
fs.readFile(resolve(__dirname, 'age.txt'), 'utf-8', function (err, data) {
    cb('age', data);
})
fs.readFile(resolve(__dirname, 'name.txt'), 'utf-8', function (err, data) {
    cb('name', data);
})

// 方法二 改造一下 让存放的变量放在作用域内 并且不需要把length硬写在逻辑中
// 使用高阶函数 可以预置参数（time）
// 但是这还是没法监控处理的过程，比如错误的处理啊什么的 所以再要改写成发布订阅模式

function action(times, callback) {
    const person = {};
    return (key, value) => {
        person[key] = value;
        if (Reflect.ownKeys(person).length === times) {
            callback(person);
        }
    }
}

const cb2 = action(2, function (data) {
    console.log('final', data);
})

fs.readFile(resolve(__dirname, 'age.txt'), 'utf-8', function (err, data) {
    cb2('age', data);
})
fs.readFile(resolve(__dirname, 'name.txt'), 'utf-8', function (err, data) {
    cb2('name', data);
})
