/**
 * Created by huk on 2019/7/8.
 */

/**
 * 和4相同的需求 这边使用发布订阅 来完成
 */

let fs = require('fs');
let e = {
    data: {},
    arr: [],//订阅的内容
    //发布订阅模式 发布和订阅无关 不订阅也可以发布就空的呗
    on(fn){
        this.arr.push(fn)
    },
    emit(name, value){
        this.data[name] = value;
        this.arr.forEach((fn) => {
            fn(this.data)
        })
    }
};

//订阅
e.on((data) => {
    if (Object.keys(data).length === 2) {
        console.log(data)
    }
});
e.on((obj) => {
    console.log("获取数据")
});

fs.readFile('./4.content1.txt', 'utf8', function (err, content) {
    if (!err) {
        e.emit('one', content)
    }
});
fs.readFile('./4.content2.txt', 'utf8', function (err, content) {
    if (!err) {
        e.emit('two', content)
    }
});