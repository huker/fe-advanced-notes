/**
 * Created by huk on 2019/7/20.
 */


/**
 * 浅拷贝
 * ...用法 如果对象是一层的话就是深拷贝 如果多层就是浅拷贝 比如{age:{a:2}}
 * Object.assign也是同上
 *
 * 深拷贝 递归拷贝
 * 主要是类型判断 不同的类型用不同的处理来拷贝
 * 1.null 或者 undefined null==undefined ===不行
 * 2.判断正则  RegExp的实例
 * 3.判断日期对象
 * 4.类型不是对象的都直接拷贝（function的typeof是function）
 *
 */


function deep(value) {
    if (value == null) {
        return value
    }
    if (value instanceof RegExp) {
        return new RegExp(value)
    }
    if (value instanceof Date) {
        return new Date(value)
    }
    if (typeof value !== 'object') return value

    let newObj = new value.constructor();     //[] {}

    for ( let i in value ) {
        if (!newObj.hasOwnProperty(i)) {
            newObj[i] = deep(value[i])
        }
    }
    return newObj
}

// let copy = deep([[123123],[12222]]);


//如果是这种递归调用 要判断 对象已经拷贝过了就返回拷贝的结果就可以了
let o = {};
o.x = o;

let copy = deep(o);
console.log(copy)