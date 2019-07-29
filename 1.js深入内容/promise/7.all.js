/**
 * Created by huk on 2019/7/29.
 */


//同步多个异步的返回结果
//Promise.all


let fs = require('fs').promises;

function isPromise(value) {
    if (typeof value === 'function' || (typeof value === 'object' && value !== null)) {
        if (typeof value.then === 'function') {
            return true
        }
    }
    return false
}

Promise.all = function (fns) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let checkRes = (i, value) => {
            arr[i] = value;
            if (arr.length === fns.length) {
                resolve(arr)
            }
        };
        for ( let i = 0; i < fns.length; i++ ) {
            if (isPromise(fns[i])) {
                fns[i].then((res) => {
                    checkRes(i, res);
                }, reject)
            } else {
                checkRes(i, fns[i]);
            }
        }
    })
};

Promise.all([
    fs.readFile('./test1.txt', 'utf8'),
    1,
    fs.readFile('./test2.txt', 'utf8')
]).then((res) => {
    console.log(res)
});