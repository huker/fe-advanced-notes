/**
 * Created by huk on 2019/7/30.
 */

// gbk编码转化成utf8
// 可以使用iconv-lite

let fs = require('fs');
let iconv = require('iconv-lite');

//创建的test是gbk编码的
let r = fs.readFileSync('./test.txt', 'utf8');

let res = iconv.decode(r, 'gbk');

console.log(res);