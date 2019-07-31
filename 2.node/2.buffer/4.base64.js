/**
 *  base64是一种编码
 * （大家都知道规则的不能称为加密解密
 *  原本汉字3字节 每个字节8个位  base64把3*8 -> 4*6
 */

let buffer = Buffer.from("你");
console.log(buffer); //<Buffer e4 bd a0>

//然后每个转成二进制(16进制转2)

// console.log(0xe4.toString(2));
// console.log(0xbd.toString(2));
// console.log(0xa0.toString(2));

// 11100100 10111101 10100000  base64编码后会更大

// 111001 001011 110110 100000

console.log(parseInt('111001', 2));
console.log(parseInt('001011', 2));
console.log(parseInt('110110', 2));
console.log(parseInt('100000', 2));

//57 11 54 32

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += str.toLowerCase();
str += '0123456789+/';

console.log(str[57] + str[11] + str[54] + str[32]);  //5L2g


//现成的方法 原理其实就是上面的
let test = Buffer.from('你').toString('base64');
console.log(test); //5L2g