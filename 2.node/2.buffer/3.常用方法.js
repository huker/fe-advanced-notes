/**
 * Created by huk on 2019/7/31.
 */

//对buffer操作

// demo1 想把1和2合起来
// 首先buffer申请完内存后大小不可变
// 如果直接相加的话得到的是字符串 我们还是想要二进制的结果
// 解决方式：可以声明一个新的12长度的buffer然后把他们拷贝进去
let buf1 = Buffer.from('你好');
let buf2 = Buffer.from('中国');

let buf3 = Buffer.alloc(12);

//0 0 6 buf3的0开始添加拷贝数据 把buf1的0到6拷贝进去
buf1.copy(buf3, 0, 0, 6);
buf2.copy(buf3, 6, 0, 6);

// console.log(buf3, buf3.toString())

//或者这样  第二个参数可选 给100的话 length就是100
let buf4 = Buffer.concat([buf1, buf2], 100);
// console.log(buf4.toString())


//indexOf方法 索引（按字节来的）

let buf = Buffer.from("你好中国好哈哈哈好的");

// console.log(buf.indexOf('中', 1));  //6

//自己实现split方法 传个分隔符

Buffer.prototype.split = function (sep) {
    let arr = [];
    let offset = 0;
    let current;
    let len = Buffer.from(sep).length;
    while ((current = this.indexOf(sep, offset)) !== -1) {
        arr.push(this.slice(offset, current));
        offset = current + len;
    }
    //最后那个
    arr.push(this.slice(offset));
    return arr
};

console.log(buf.split('好'));