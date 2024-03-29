## react18的原理

整体：

- 把babel编译后的code变成虚拟dom jsx
- 把虚拟dom转化成浏览器可识别的真实dom

### jsx

1.babel的automatic和classic：

一段jsx老版本的react babel编译出来是React.createElement，新版是jsx的方法，本质是一样的，差别是：

- 以前的版本需要自己手动引入react 现在不需要了
- 结构不一样

import React from 'react'; 这行代码 因为 React在实际编译的时候需要用到 所以虽然代码中没有写React 也需要引入

2.流程

用户写的jsx --1--> 运行前babel转译 --2--> 浏览器运行结果 虚拟dom

ReactJSXElement的jsxDev就是做了2这个流程, 这个编译是在浏览器中进行的，不是打包时候生成的

<b>什么是虚拟dom？</b>

在内存中的一个js对象，用来描述dom是什么样子的

3.实现代码（细节备注在代码中）

jsx/ReactJSXElement.js

### Fiber

1.js任务执行时间过长：

浏览器刷新频率60Hz（60次/秒），大概16.6毫秒渲染一次，而js线程和渲染线程是互斥的，所以如果js执行任务时间超过16.6ms的话，就会掉帧导致卡顿，所以要react利用空闲
的时间进行更新。把一个耗时的任务拆分成一个个小任务，分布在每一帧里的方式叫时间切片。

2.浏览器一个帧（16.6ms）：

input event输入时间 -> js（定时器） -> 开始帧 -> requestAnimationFrame -> Layout布局 -> Paint绘制 -> 空闲时间（idle period）

前面这些都算是高优先级任务，利用空闲时间（平均约5ms，这个不一定）来处理任务，用户使用requestIdleCallback来向浏览器申请空闲的时间片

3.requestIdleCallback

- 向浏览器申请空闲的时间片
- 使开发者能够在主事件循环上执行后台和低优先级的工作，而不会影响延迟关键事件（如动画和输入响应）
- 正常帧任务完成后如果没有超过16.6ms，说明有时间富余，就会执行requestIdleCallback里注册的任务
- 任务时间到了会归还控制权给浏览器，如果没有做完会申请下一个时间片继续做
- 空闲任务中，单个任务执行过长，不会被中断，一个任务就是执行的最小单位（每个任务是原子性的），过长就会卡死
- 这个调度方式是 合作调度，是用户和浏览器的双方合作（信任对方写的是合理的）

理念是这样的，但React中没有直接使用requestIdleCallback，因为兼容问题和剩余时间不可控，它自己实现了一个类似的，规定了时间是5ms

4.Fiber

- 可以通过某些调度策略合理分配CPU资源，从而提高用户响应速度
- 通过Fiber架构，让自己的调和过程变成可被中断，适时地让出CPU执行权，可以让浏览器及时的响应用户的交互

<u>Fiber是一个执行单元</u>

整体的理念和3一样，一个Fiber就是一个任务，是执行任务的最小单位，在空闲时间执行。

如果最小单位任务时间过长，会造成卡顿，最小单位是不可分割也停止不了的

<u>Fiber是一种数据结构</u>

在内存中构建一个虚拟dom，基于这个虚拟dom去构建fiber树，是个链表

按照虚拟dom，每一个节点都对应一个Fiber节点，但如果一个react节点只有一个子，而且这个子是一个字符串或者数字的话，则不再为它创建子fiber节点

- fiber树建立后，后面是通过增删改fiber节点来改变这棵树
 - 树的访问是深度优先

深度优先：

DFS，其过程简单说是对每个可能的分支路径深入到不能再深入为止，而且每个节点只能访问一次

场景有 React虚拟Dom构建 Fiber树构建


