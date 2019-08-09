/**
 * Created by huk on 2019/8/9.
 */


async function async1() {
    console.log('async1 start');
    //两种写法 结果不同
    await async2();
    console.log('async1 end');

    // async2().then(() => {
    //     console.log('async1 end');
    // })
}
async function async2() {
    console.log('async2')
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout')
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');


//await async2 其实转换过来不是上面的写法 而是
// async2().then(() => {
//     Promise.resolve().then(()=>{
//         console.log('async1 end');
//     })
// })
//所以原因是await被编译出了两个then node10以下是一个then
//不会先把async1执行完是因为async1()前没有await 所以不会等待着全部执行完