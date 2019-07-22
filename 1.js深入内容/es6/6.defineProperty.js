/**
 * Created by huk on 2019/7/22.
 */

/**
 * defineProperty 定义属性
 *
 * 属性访问器
 * getter setter
 *
 */

//get 其实是defineProperty的简写
let obj = {
    value: '',
    get url() {
        //可以做一些处理
        return this.value
    },
    set url(v) {
        //可以做一些处理
        this.value = v;
    }
}

obj.url = 100;

// console.log(obj.url)

//defineProperty的写法
let obj2 = {};
let data = '';
Object.defineProperty(obj2, 'data', {
    // value: 200
    enumerable: true,  //可枚举
    configurable: true, //可修改
    // writable: true,  //是否可写 writable是和value合用 不能和getset一起
    get(){
        return data
    },
    set(v){
        data = v;
    }
})
obj2.data = 'haha';
console.log(obj2, obj2.data)