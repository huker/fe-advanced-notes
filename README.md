## 前端进阶记录
> keep moving！此处为目录，具体内容看代码 + 注释。

- step1 JS深入

### step1 JS深入
#### 1.高阶函数
> 满足参数是一个函数 或者 返回值是一个函数就是高阶函数

**例子1**：AOP(面向切片编程) 把代码二次封装不破坏原有的逻辑，放入自己的逻辑

代码：1.js深入内容 -> callback -> 1.1.aop.js

react中也有类似的思想 - 事务

在一个逻辑之前和之后执行wrapper 可以执行多个wrapper

代码：1.js深入内容 -> callback -> 1.7.react事务.js

**例子2**：类型判断方法的封装

代码：1.js深入内容 -> callback -> 1.2.isType.js

**例子3**: after 在调用多少次之后执行

代码：1.js深入内容 -> callback -> 1.3.after.js && 1.4.asyncdata.js(after的应用)

涉及到的别的内容：
- 函数柯里化 1.8.柯里化和反柯里化.js

#### 2.发布订阅、观察者模式

**发布订阅**：发布 订阅是分开的

代码：1.js深入内容 -> callback -> 1.5.asyncdata.js

**观察者模式**：观察者模式包含发布订阅，观察者和被观察者是联系在一起的

代码：1.js深入内容 -> callback -> 1.6.asyncdata.js

#### 3.promise

**1.基础概念**

- 3状态：pending fulfilled rejected
- new Promise的参数是个executor执行器（会直接执行的）
- 状态是不可更改的 走了resolve就不会再走reject
- 错误都会走reject 比如throw Error
- promiseA+规范

代码：1.js深入内容 -> promise -> 1

**2.解决异步**

- 主要是解决异步问题 发布订阅模式

代码：1.js深入内容 -> promise -> 2

**3.链式调用**
- 调用then return一个新的promise
- 统一处理then的结果
  - 常量
  - promise（兼容各种promise），是promise的话取执行结果
  - 递归，promise里可能继续套了promise
  - 状态不可变
- 值的穿透
- 测试自己写的promise是否符合promiseA+规范

代码：1.js深入内容 -> promise -> 3

**4.promise相关**

4.1 如何终止中断一个promise

- 链式调用里 返回一个pending的promise 可以中断链式

- 比如promise执行3秒 想在2s的时候就reject掉 可以借助race 第一个失败了就都失败了

4.2 Promise.resolve(fn())会等待fn执行完再得到结果，无论是异步还是同步，所以在finally或try中都可以通过这做到获取到结果再then/catch

代码: 1.js深入内容 -> promise -> finnaly实现.js

#### 4.es6
**let/const**

var的缺点：

- var声明的变量 声明到全局 全局变量
- var变量提升 能在声明之前调用
- let const可以用{}的方式连用 块作用域
- var能重复声明 在同一作用域下

**Symbol**

- 独一无二

- 参数是 描述（描述这个symbol） 【可选参数】

- 如果对象属性是symbol声明的 他是不可枚举的 for的时候不会出来 Object.keys也是，可以通过Object.getOwnPropertySymbols(obj)取

- Symbol.for() 不会重新声明

  ```javascript
  let v1 = Symbol.for('12');
  let v2 = Symbol.for('12');
  console.log(v1 === v2); //true
  ```

- Symbol.interator 元编程 改变一些默认系统级的方法

**Spread**

- 解构赋值

- …是对象的展开，只能在结尾用 收敛功能 把最后的几项都捋在一起

  ```javascript
  let [x1, ...x2] = [1, 2, 3, 4];
  ```

- 类数组 转化为 数组

  两种方法的区别是Symbol.interator，{xxx}中打出来其实有这个属性，有它才能用…，也可以在对象上自己添加这个属性来实现功能  代码：1.js深入内容 -> es6 -> 3.spread.js

  ```javascript
  //方法一
  function func() {
      console.log(Array.from(arguments))
  }
  //方法二
  function func(...args) {
      console.log([...args])
  }
  ```

  