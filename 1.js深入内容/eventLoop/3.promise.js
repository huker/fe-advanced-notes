/**
 * Created by huk on 2019/8/8.
 */

setTimeout(()=>{
    console.log("setTimeout1")
    Promise.resolve().then(()=>{
        console.log("Promise1")
    })
    Promise.resolve().then(()=>{
        console.log("Promise11")
    })
});


setTimeout(()=>{
    console.log("setTimeout2")
},0);

Promise.resolve().then(()=>{
    console.log("Promise2")
})

console.log("async")
