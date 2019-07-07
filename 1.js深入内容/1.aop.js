/**
 * Created by huk on 2019/7/7.
 */

//AOP 面向切片编程
//在不破坏原有逻辑的基础上 插入自己的逻辑

//比如在say方法说话之前 想要先说一个 “你好” 这时候要不破坏say这个方法
//
// function say() {
//     console.log("说话点啥")
// }

// Function.prototype.before = function (fn) {
//     fn();
//     this();
// };
//
// say.before(function () {
//     console.log("你好")
// });
//上面这样已经完成了想要的效果 但是这样就调用before的时候直接执行了 我们想要自己控制执行
//所以修改成如下 定义好这个newSay 然后再执行

//最后形成了典型的高阶函数 参数是函数 返回值也是函数

function say(a, b) {
    console.log("说话点啥", a, b)
}

Function.prototype.before = function (fn) {
    var that = this;
    return function () {
        fn();
        //apply是用来传参的
        that.apply(null, arguments);
    }
};

var newSay = say.before(function () {
    console.log("你好")
});

newSay(1, 2);