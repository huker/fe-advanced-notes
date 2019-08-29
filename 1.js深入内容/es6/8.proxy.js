/**
 * 也是可以用来做劫持
 * dinefineproperty 用在对象上 不能监听数组的变化
 * Proxy就都可以
 * 但是缺点就是Proxy是es6的方法 兼容性比较差
 */

 let obj  = {
     name:'huk'
 }

 let arr = []

 let proxy = new Proxy(arr,{
     get(target,key){
        //  可以这么写 但是不高端
        //  return target[key]

        // 反射这个方法 
        return Reflect.get(...arguments)
     },
     set(target,key,value){
         console.log("update")
         return Reflect.set(...arguments)
     }
 })

//  proxy.age = 10

proxy.push('123') // 触发两次set 第一次是push值 第二次是length改变

