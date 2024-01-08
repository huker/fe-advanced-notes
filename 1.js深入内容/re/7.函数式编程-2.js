/**
 *  y = f(x) 函数式编程我们一直说是基于纯函数的
 *
 *  纯函数 要 有输入 有输出 而且是输入对应的输出是一定的 且不影响外部变量、不能依赖外部变量
 *
 */

// 这不是纯函数 没有输入
// function fn1() {
//     let date = new Date();
//     return date.toLocaleDateString();
// }
// const a = fn1();
// console.log(a)

// 这种也不是 没有输入、每次输出不一样 而且依赖了外部状态 
// 副作用->是会导致外部变量改变
// let i=0;
// function fn(){
//     i++;
//     return i;
// }


// redux的reducer一般都是纯函数 给一个输入 就给一个输出

/**
 *  副作用是什么？
 * 
 *  例如： 对外部资源访问 ajax  访问数据库  改变全局变量  对公共内存管理   dom访问  等等
 * 
 *  副作用会对方法的通用性降低
 * 
 * 
 *  纯函数的好处：
 * 
 *  1.可以缓存（因为输出对于输入来说是恒定的 所以可以缓存下来）  
 *  2.方便测试
 *  3.可以并发执行 因为不会相互作用 也不会影响公共资源 ， 所以状态管理都会采用纯函数的方式
 * 
 * 
 *  函数式编程的好处也就是纯函数的好处  而且方便复用和组合扩展
 * 
 * 
 *  vue3的响应式api不是函数式编程   只是说vue3的内部很多源码是基于函数式编程的
 *  
 * 
 */



