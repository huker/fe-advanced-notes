/**
 * 什么是函数式编程？
 * 
 * 范式 用函数来“组合”以及“处理数据”（将运算过程抽象成函数）
 * 
 */

let arr = [1, 2, 3, 4, 5];

// 1.pp 面向过程 一步步按照需求完成代码
// let total = 0;
// for (let i = 0; i < arr.length; i++) {
//     total += arr[i]
// }
// console.log(total)


// 2.oop 将逻辑分解成对象
// class Count {
//     constructor() {
//         this.total = 0
//     }
//     sum(arr) {
//         for (let i = 0; i < arr.length; i++) {
//             this.total += arr[i]
//         }
//         return this.total
//     }
// }
// const count = new Count();
// const sum = count.sum(arr);
// console.log(sum)


// 3.fp 函数式编程 数学意义上的 y=f(x)
// 比如说reduce就是典型的  高阶函数的结合
const sum = arr.reduce((prev, next) => prev + next, 0);
console.log(sum)