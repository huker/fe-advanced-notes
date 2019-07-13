## 前端进阶记录
> 不学习就要被时代淘汰鸭，嘎油！此处为目录，具体内容看代码 + 注释。

### step1 JS深入理解
#### 1.高阶函数
> 满足参数是一个函数 或者 返回值是一个函数就是高阶函数

例子1：AOP(面向切片编程) 把代码二次封装不破坏原有的逻辑，放入自己的逻辑

代码：1.js深入内容 -> callback -> 1.1.aop.js

例子2：类型判断方法的封装

代码：1.js深入内容 -> callback -> 1.2.isType.js

例子3: after 在调用多少次之后执行

代码：1.js深入内容 -> callback -> 1.3.after.js && 1.4.asyncdata.js(after的应用)

#### 2.发布订阅、观察者模式

发布订阅：发布 订阅是分开的

代码：1.js深入内容 -> callback -> 1.5.asyncdata.js

观察者模式：观察者模式包含发布订阅，观察者和被观察者是联系在一起的

代码：1.js深入内容 -> callback -> 1.6.asyncdata.js

#### 3.promise

1.基础实现
- 3状态：pending resolved rejected
- new Promise的参数是个executor执行器（会直接执行的）
- 状态是不可更改的 走了resolve就不会再走reject
- 错误都会走reject 比如throw Error

代码：1.js深入内容 -> promise -> 1

2.解决异步
- 主要是解决异步问题 发布订阅模式

代码：1.js深入内容 -> promise -> 2

3.链式调用

代码：1.js深入内容 -> promise -> 3
