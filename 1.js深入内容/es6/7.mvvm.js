/**
 *  劫持 mvvm vue中
 */

 let data = {n:100};

 function observer(value){
     if(typeof value !== 'object'){
         return value
     }else{
         defineValue(value)
     }
 }

 function defineValue(value){
    Object.defineProperty(value,)
 }


 observer(data)
 data = {n:200};