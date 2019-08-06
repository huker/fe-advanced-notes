/**
 * Created by huk on 2019/7/31.
 */

//实现大文件的读取分割 分段读取

let fs = require('fs');

//返回的是可读对象
//基于fs.open fs.read fs.close封装的
/**
 * options <string> | <Object>
 flags <string> 参阅支持的文件系统标志。默认值: 'r'。
 encoding <string> 默认值: null。  null读到的就是buffer的
 fd <integer> 默认值: null。
 mode <integer> 默认值: 0o666。
 autoClose <boolean> 默认值: true。 是否读完以后自动关闭
 start <integer>  读取的开始结束为止 不传就是从头到尾
 end <integer> 默认值: Infinity。
 highWaterMark <integer> 默认值: 。（64k）  最高水位线 每次读的大小
 */

let ReadStream = require('./2.实现readStream');

// let rs = fs.createReadStream('./a.txt', {
let rs = new ReadStream('./a.txt', {
    flags: 'r',
    encoding: null,
    start: 0,  //包前又包后
    end: 9,
    // highWaterMark: 64 * 1024
    highWaterMark: 3
});
//默认是非流动的
let arr = [];

rs.on('open', function (fd) {
    //文件描述符
    console.log("open", fd)
})

//在on data的时候才会拿到 有on说明是继承的event
rs.on('data', function (data) {
    //<Buffer 69 75 77 68 71 75 72 62 69 71>
    // 16进制 6*16+9 = 105 对应ascii的i 文件里的第一个就是i
    console.log(data);
    //这边不用+=data这种拼接是因为汉字是三个字节 highWaterMark有可能会把汉字的字节拆开来读 拼起来就不对了
    arr.push(data);
    rs.pause();
});

//传输结束的监听
rs.on('end', function () {
    console.log(Buffer.concat(arr).toString())
});

rs.on('error', function (err) {
    console.log("err", err)
})

rs.on('close', function () {
    console.log("close")
})

//open close是文件才有的