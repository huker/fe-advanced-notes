/**
 * Created by huk on 2019/7/14.
 */

/**
 * 新增内容：跟上1.1.aop
 * react中的事务概念 也是利用了aop的概念
 */

class Transaction {
    perform(anyMethod, wrapper) {
        wrapper.forEach(item => item.initialize());
        anyMethod();
        wrapper.forEach(item => item.close());
    }
}

let oldFunc = () => {
    console.log("原有的逻辑")
}

let t = new Transaction();

//wrapper包裹原函数 react中事务很多 不止一个 所以数组
t.perform(oldFunc, [
    {
        initialize: () => {
            console.log("初始化1")
        },
        close: () => {
            console.log("关闭1")
        }
    },
    {
        initialize: () => {
            console.log("初始化2")
        },
        close: () => {
            console.log("关闭2")
        }
    }
]);

