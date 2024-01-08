// 闭包 

// 函数可以记住和访问当前所在的词法作用域（声明决定的） 函数是在当前词法作用域之外执行 就会产生闭包

// https://juejin.cn/post/6844904161268482062#heading-4


// 了解作用域
// var name = 'Mike';
// function showName() {
//     console.log(name);
// }
// function changeName() {
//     var name = 'Jay';
//     showName();
// }
// changeName()


// 一个闭包的例子
let count = 500;    // 全局作用域
function foo1() {
    let count = 0;  // 函数全局作用域
    function foo2() {
        count++;    // 函数内部作用域
        console.log(count);
        return count;
    }
    return foo2;    // 返回函数
}
let result = foo1();
result();   // 1
result();   // 2


// 这种时候是不产生闭包的 因为foo2函数内部没有调用外部的变量
// 不是所有的函数嵌套函数都能形成闭包！
// function foo1() {
//     let count = 0;
//     function foo2() {
//         let count2 = 1;
//     }
//     return foo2;
// }
// let result = foo1();
// result();

// 经典循环问题
// for (var i = 1; i <= 5; i++) {
//     setTimeout(function timer() {
//         console.log(i); // 6 6 6 6 6
//     }, 1000);
// }

// 办法1 var变成let 块级作用域 每一层循环都是独立的

// 办法2 原理都是一样的 就是让循环中的每一次都独立开来
// for (var i = 1; i <= 5; i++) {
//     log(i);
// }
// function log(i) {
//     setTimeout(function timer() {
//         console.log(i);
//     }, 1000);
// }

// 办法3 匿名函数 和2是一个意思 写法不同而已
// for (var i = 1; i <= 5; i++) {
//     (function (i) {
//         setTimeout(function timer() {
//             debugger;
//             console.log(i);
//         }, 1000);
//     })(i)
// }



// 当一个变量既不是该函数内部的局部变量,也不是该函数的参数,相对于作用域来说,就是一个自由变量(引用了外部变量),这样就会形成一个闭包
// function a(){
//     let num = 0;
//     function b(){
//         num++;
//         console.log(num)
//     }
//     return b
// }
// a()()