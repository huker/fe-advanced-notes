/**
 * Created by huk on 2019/7/19.
 */


//解构赋值

let [x, y] = ['name', 'age'];
let [, z] = ['name', 'age'];

console.log(x, y, z);

let { length } = [];
console.log(length); //0

//... 对象的展开
// 还可以是剩余 在函数中使用 可以在解构中使用
// ...只能在结尾用 收敛功能 把最后的几项都捋在一起

let [x1, ...x2] = [1, 2, 3, 4];
let [, ...x3] = [1, 2, 3, 4];
console.log(x1, x2);

let { name, ...obj } = { 'name': 123, age: 12 };
console.log(name, obj)


//类数组 -》 数组  Array.from是通过迭代器生成的
// function func() {
//     console.log(Array.from(arguments))
// }

// function func(...args) {
//     console.log(args)
// }

/**
 * Array.from和[...{xxx}]的区别 Symbol.interator {xxx}里有这个才能用...
 * 也可以自己实现 就是元编程 在对象上自己添加这个方法
 */
function func() {
    // console.log([...arguments]);
    console.log([...{
        //*这是一个生成器 会默认让生成器执行next方法
        //next方法碰到yield会暂停 然后把value和done取出来 {value:0.,done:false}
        // 没有done就继续next 并且把value放到数组里
        0: 1, 1: 'hah', length: 2, [Symbol.iterator]: function *() {
            // console.log(this)
            //yield 的值
            let i = 0;
            while (this.length !== i) {
                yield this[i++];
            }
        }
    }])
}

func(1, 2, 'aha');

