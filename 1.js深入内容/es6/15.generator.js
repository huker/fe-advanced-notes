
// 核心是co库
// 生成器
function* gen() {
    console.log(1);
    let one = yield '123';
    console.log(2, one);
    yield '321';
    console.log(3);
}

// 迭代器 iterator
let it = gen();

let res1 = it.next(); //走到第一个yield 停住 此时还没给one赋值
console.log(res1);

//下一个next就从给one赋值开始走到下一个yield停住
//next传入的内容就是给one的赋值内容
let res2 = it.next('one!!!!');
console.log(res2);

let res3 = it.next();
console.log(res3);