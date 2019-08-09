const p1 =Promise.resolve();
(()=>{
    const p2 = new Promise(resolve =>{
        const p3 = new Promise(res=>res(p1));
        p3.then(()=>{
            console.log('after:await');
            resolve()
        })
    });
    return p2
})();
p1.then(()=>{
    console.log('tick:a');
}).then(()=>{
    console.log('tick:b');
}).then(()=>{
    console.log('tick:c');
});







/**
 * 解释：
 * 1.首先立即执行函数执行
 * 2.第一个p1.then先执行
 * 3.执行完首先进入第二个then
 * 3.然后由于p1的then执行完毕 所以p3就绪了 把p3的then也放进微任务队列里
 * 4.p1.then的then先进队列 p3.then后进 所以b先输出 after后输出
 *
 */