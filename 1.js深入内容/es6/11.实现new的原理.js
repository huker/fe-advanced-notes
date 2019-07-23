/**
 * Created by huk on 2019/7/21.
 */


function myNew(...args) {
    let source = args[0];
    let obj = Object.create(source.prototype);
    let content = source.call(obj, ...args.slice(1));
    if (typeof content === 'object' || typeof content === 'function') {
        return content;
    } else {
        return obj;
    }
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
function test2() {
    return function () {
        console.log("test")
    }
}
Person.prototype.getName = function () {
    return this.name
};
let b = myNew(Person, 'huk', 24);
console.log(b, b.getName());
let c = myNew(test2);
console.log(c);