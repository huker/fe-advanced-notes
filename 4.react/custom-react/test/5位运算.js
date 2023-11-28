let a = 0b001;
let b = 0b010;
let flag = 0b000;

flag |= a;
flag |= b;

// & 取反a 从flag中把a删掉
// flag = flag & ~a

// 判断包含
let has = (flag & a) === a
// 判断不包含
// let has = (flag & a) === 0
console.log(has)

// flag &= a;
// flag &= b;

// |= 时 同为0则0  有1为1
// &= 时 同为1才是1  有0为0

// 高位丢弃 低位补0
// let flag = 0b001;
// flag<<=2;

// 正数左补0 负数左补1
// let flag = 0b011;
// flag>>=1

console.log(flag)

