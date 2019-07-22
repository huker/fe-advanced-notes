/**
 * Created by huk on 2019/7/22.
 */

function Animal() {
    this.type = '哺乳类';
}
Animal.prototype.eat = function () {
    console.log("吃饭")
}

function Tiger() {
    Animal.call(this) //相当于搬过来 this.type = '哺乳类';
}
Tiger.prototype.shut = function () {
    console.log("大吼")
}
/**
 * 第一句注释掉的 是错误的 因为这样就让原型混在一起了 老虎加了的方法也会跑到动物上
 * 应该是要老虎能有自己的属性 同时可以找到动物属性
 */
// Tiger.prototype = Animal.prototype;
/**
 * 应该给Tiger加属性是加的Tiger的prototype 如果在这上面找不到 就沿着他的__proto__去Animal原型上找
 * 下面这两句是一样的 两种写法
 * 第二种是es6方法 设置原型 把Tiger的prototype设给Animal的prototype
 */
// Tiger.prototype.__proto__ = Animal.prototype;
Object.setPrototypeOf(Tiger.prototype, Animal.prototype);

let tiger = new Tiger();
console.log(tiger.type, tiger.eat())