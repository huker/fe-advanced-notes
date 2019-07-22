/**
 * Created by huk on 2019/7/21.
 */


function myNew(...args) {
    let constructor = args[0];
    let obj = Object.create(constructor.prototype);
    let res = constructor.call(obj, ...args.slice(1));
    if ((typeof res === 'object' || typeof res === 'function') && res != null) {
        return res;
    } else {
        return obj;
    }
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function () {
    return this.name
};
let b = myNew(Person, 'huk', 24);
console.log(b);
console.log(b.getName());