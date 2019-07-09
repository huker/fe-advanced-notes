/**
 * Created by huk on 2019/7/7.
 */

/**
 * 还是高阶函数部分
 * 第二个例子 类型判断方法的封装
 * 使用Object.prototype.toString.call(xxx)来判断
 */

// 版本1 这种方式就要手动输入类型 需要写准确才行 不然就会导致错误的结果
// 所以要避免这种我们把它变成方法 如isString isNull 这样
// function isType(obj, type) {
//     return Object.prototype.toString.call(obj) === `[object ${type}]`
// }
//
// console.log(isType('123', 'String'));

//版本2
//这样调用的时候不会有写错的情况 如果写错方法名的话就会报错 而不是误判断
//返回值是一个函数 所以也是高阶函数

function isType(type) { //函数柯里化 把参数拆开来（原本obj, type） 有组合的效果
    return function (obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
}

let objs = {};
let types = ['String', 'Boolean', 'Null', 'Number'];

types.forEach((type) => {
    objs['is' + type] = isType(type)
});

console.log(objs.isString('123'));
console.log(objs.isNumber(123));