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

function fn1() {
    let s1 = new Set([...arr1, ...arr2]);
    console.log([...s1])
}
fn1()

function fn2() {
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    let b = [...s1].filter((item) => {
        return s2.has(item)
    })
    console.log(b)
}

fn2()