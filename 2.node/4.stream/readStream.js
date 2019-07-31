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
 highWaterMark <integer> 默认值: 64 * 1024。（64k）  最高水位线 每次读的大小
 */
let rs = fs.createReadStream('./a.txt', {
    flags: 'r',
    encoding: null,
    start: 0,  //包前又包后
    end: 9,
    highWaterMark: 64 * 1024
});

console.log(rs)
