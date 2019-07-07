/**
 * Created by huk on 2019/7/7.
 */

/**
 * 高阶函数3 after
 * lodash中也有的方法 在调用多少次之后执行
 * 那就需要after(times,callback)这么一个方法
 *
 */

function say() {
    console.log("哈哈");
}
//参数是函数 返回值也是函数
function after(times, callback) {
    return function () {
        if (--times === 0) {
            callback();
        }
    }
}

//调动3次才执行say方法
let newSay = after(3, say);

newSay();
newSay();
newSay();
