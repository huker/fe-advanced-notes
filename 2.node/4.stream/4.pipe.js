/**
 * Created by huk on 2019/8/6.
 */


let fs = require('fs');

//可读
let rs = fs.createReadStream('a.txt');
//可写
let ws = fs.createWriteStream('b.txt');


//输出通过管道流向输入
rs.pipe(ws);