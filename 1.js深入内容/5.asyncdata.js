/**
 * Created by huk on 2019/7/8.
 */

/**
 * 高阶函数
 * 和4相同的需求 这边使用发布订阅 来完成
 */

let fs = require('fs');
let e = {
    arr: [],//订阅的内容
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        this.arr.forEach((fn) => {
            fn()
        })
    }
};

//订阅
e.on(function (obj) {
    console.log("1", obj)
});
e.on(function (obj) {
    console.log("2", obj)
});
//发布
e.emit();

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