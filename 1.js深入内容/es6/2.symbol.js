/**
 * Created by huk on 2019/7/19.
 */

//Symbol 特点是独一无二


//参数是 描述（描述这个symbol） 可选参数
let s1 = Symbol();


//Symbol([object Object]) 内部会把描述tostring
let s2 = Symbol({});
console.log(s2)


let s3 = Symbol(12);
let s4 = Symbol(12);
//false
console.log(s3 === s4)

//如果属性是symbol声明的 他是不可枚举的 for的时候不会出来 Object.keys也是
let obj = {
    [s3]: 1
}
console.log(obj[s3]);
//得这样才能拿到 算是Symbol的Object.keys
console.log(Object.getOwnPropertySymbols(obj))

//Symbol.for 不会重新声明
let v1 = Symbol.for('12');
let v2 = Symbol.for('12');
//true
console.log(v1 === v2)
console.log(Symbol.keyFor(v2))

//Symbol有原编程的功能 改变默认系统级的方法


//可以做私有属性 默认js中没有私有属性的