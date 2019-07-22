/**
 * Created by huk on 2019/7/20.
 */

/**
 * set map不能放重复类型
 *
 */

let a = new Set([1, 2, 3]);


//数组去重 并集  交集  差集

let arr1 = [2, 3, 4];
let arr2 = [2, 2, 3, 5, 6];
//并集
function fn1() {
    let s1 = new Set([...arr1, ...arr2]);
    console.log([...s1])
}
fn1()
//交集
function fn2() {
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    let b = [...s1].filter((item) => {
        return s2.has(item)
    })
    console.log(b)
}

fn2()
//差集
function fn3() {
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    let b = [...s1].filter((item) => {
        return !s2.has(item)
    })
    console.log(b)
}

fn3()

//Map
let map = new Map([['name', 'huk']]);
map.set('name', 'huk2');
map.set('age', '24');

console.log(map, map.get('name'))


class fn {

}
let f = new fn();
let map2 = new Map();
map2.set(f, 'ok');  //{ fn {} => 'ok' }
f = null;

console.log(map2)
/**
 * 这边涉及垃圾回收机制 f虽然被设置null了 但是由于set里还有引用 所以fn不会被销毁
 * 其实不好 null还在 算是内存泄漏
 */


/**
 * weakMap 弱引用
 * key只能是对象
 * 这边就会被回收 浏览器快照里是找不到fnx的 已经销毁了
 */
class fnx {

}
let f1 = new fnx();
let map3 = new WeakMap();
map3.set(f1, 'ok');  //{ fn {} => 'ok' }
f1 = null;

console.log(map3)
