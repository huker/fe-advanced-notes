/**
 * 简易实现深度代理
 * 上一个文件只是第一层可以触发update 如果属性是个对象 给对象里面的修改 不会触发
 * 所以要进一步处理 在取值的时候 重新创建一个proxy
 * 如果在最初的时候直接让book的值变成一个proxy的话 会触发set 导致触发update
 */

let obj = {
    name: 'huk',
    book:{
        name:'123'
    }
}

let handler = {
    get(target, key) {
        if (typeof target[key] === 'object') {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(...arguments)
    },
    set(target, key, value) {
        console.log("update")
        return Reflect.set(...arguments)
    }
}

let proxy = new Proxy(obj, handler)

proxy.book.name = 'hello'
proxy.book = '123'