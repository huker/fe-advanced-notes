/**
 * Created by huk on 2019/7/14.
 */

function fn(a) {
    return function (b) {
        return function (c) {
            return a * b * c;
        }
    }
}

let res = fn(2)(3)(4);

console.log(res);