/**
 * Created by huk on 2019/7/19.
 */

// for ( var i = 0; i < 10; i++ ) {
//     setTimeout(()=>{
//         console.log(i)
//     })
// }

//产生了块作用域
for ( let i = 0; i < 10; i++ ) {
    setTimeout(() => {
        console.log(i)
    })
}


//const 可以深度改变 只要不改变空间即可
const a = {};

a.x = 100;

console.log(a)

//空间不销毁才是闭包