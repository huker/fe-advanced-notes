## promise

promise是js中用来处理异步操作的对象，es6出现的

### 解决什么问题
1.解决回调地狱（难维护、难理解）

用链式调用的方式把嵌套的逻辑打平

2.回调函数在处理的时候，都要做错误处理，无法让错误处理统一

catch方法可以捕获，且统一处理

3.并发，传统中需要计数来完成

提供了Promise.all Promise.allSettled Promise.race这种方式

### 标准
- 三个状态：pending fullfilled rejected  一个promise实例的状态只能变化一次,成功或失败后状态不可变
- then方法，接受两个参数（成功，失败）
- 每个promise创建的时候需要传入一个executor 执行器 （立刻执行）
- pending的对象通过resolve进入成功态，通过抛出错误或者reject进入失败状态

