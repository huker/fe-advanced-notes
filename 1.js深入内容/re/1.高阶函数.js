// 高阶函数

// 扩展一个函数的功能 不影响原功能
function a(a, b, c) {
    console.log(a, b, c)
}

Function.prototype.before = function (callback) {
    callback();
    return (...args) => {
        this(...args);
    }
}


const newa = a.before(() => {
    console.log('before do!')
})

newa(1, 2, 3);

// 预置一些参数
function sum(a, b, c) {
    return a + b + c;
}

function custonApply(fn, ...args) {
    return (...args2) => {
        return fn(...args, ...args2)
    }
}

const sumPlus = custonApply(sum, 1, 2);

const res = sumPlus(3);

console.log(res)


