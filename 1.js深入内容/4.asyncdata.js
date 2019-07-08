/**
 * Created by huk on 2019/7/8.
 */

/**
 * 高阶函数
 * 这边试一下after的应用
 * node的api有异步的 现在调两个异步的方法 都拿到结果后再执行某函数
 * 就是 处理并发的异步将结果同步（这个同步不是那个同步 就是都拿到了的意思）
 *
 * 异步的结果需要通过回调或者await获得 错误处理也是
 *
 * 思路1 一个异步放在另一异步结果里执行
 * 缺点 这样就不是并发执行了 比如一个需要10s 一个需要5s 这样就需要15s了其实可以10s就拿到的
 * 思路2 结束后都调用render 然后声明一个data看data的keys是否2个了 2个就说明都拿到了
 * 缺点 2次是写死的 data声明的全局的 不优雅
 * 思路3 利用after 运行x次之后执行xxx
 * 核心就是计数 写法可以各种各样
 */

//思路3
let fs = require('fs');
let data = {};
function render(data) {
    console.log("data", data);
}

function after(times, cb) {
    let data = {};
    return function (name, value) {
        data[name] = value;
        if (times === Object.keys(data).length) {
            cb(data);
        }
    }
}
let newRender = after(2, render);
fs.readFile('./4.content1.txt', 'utf8', function (err, content) {
    if (!err) {
        newRender('one', content)
    }
});
fs.readFile('./4.content2.txt', 'utf8', function (err, content) {
    if (!err) {
        newRender('two', content)
    }
});

//思路2
// let fs = require('fs');
// let data = {};
// function render(name, value) {
//     data[name] = value;
//     if (Object.keys(data).length === 2) {
//         console.log("data", data);
//     }
// }
// fs.readFile('./4.content1.txt', 'utf8', function (err, content) {
//     if (!err) {
//         render('one', content)
//     }
// });
// fs.readFile('./4.content2.txt', 'utf8', function (err, content) {
//     if (!err) {
//         render('two', content)
//     }
// });