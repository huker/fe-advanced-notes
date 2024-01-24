// Promise解决异步是嵌套、链式调用的方式  复杂的逻辑下还是嵌套问题很严重
// es6 提供生成器函数   让异步变成更像同步


// 自定义迭代器  改变类数组的默认编程模式
// let data = {
//     0: '1',
//     1: '2',
//     2: '3',
//     length: 3,
//     [Symbol.iterator]() {
//         let index = 0
//         return {
//             next: () => {
//                 return { value: this[index], done: index++ === this.length }
//             }
//         }
//     }
// };

// 或者可以利用generator
let data = {
    0: '1',
    1: '2',
    2: '3',
    length: 3,
    [Symbol.iterator]: function* () {
        let len = this.length;
        let index = 0;
        while (index < len) {
            yield this[index++];
        }
    }
};

// 默认会 data is not iterable
// 如果我们想要它返回['1','2','3']就需要自定义iterator
console.log([...data]);