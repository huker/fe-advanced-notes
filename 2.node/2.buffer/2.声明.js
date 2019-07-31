/**
 * Created by huk on 2019/7/31.
 */


//buffer长度不是按字的数量 是按字节数 所以你好就是length 6


let buffer = Buffer.alloc(3);

let buffer1 = Buffer.from('你好');

//会自动转成16进制 除非自己写的就是16进制
let buffer2 = Buffer.from([100, 200]);

console.log(buffer, buffer1, buffer2)

