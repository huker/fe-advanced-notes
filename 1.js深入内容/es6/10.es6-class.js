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
//
let tiger = new Tiger();
console.log(tiger.type, tiger.eat())

/**
 * 还可以用Object.create()方式 来实现继承
 * 它的原理和上面不一样 不用原来tiger的prototype 新建了一个函数来指向Animal的prototype
 * 并让Tiger的prototype指向它
 */

function myCreate(ParentPrototype) {
    let Fn = function () {

    };
    Fn.prototype = ParentPrototype; //把父类的原型 放到Fn上
    //返回的是一个实例
    return new Fn();
}

// Tiger.prototype = Object.create(Animal.prototype, { constructor: { value: Tiger } });
//让Tiger的原型指向Fn函数的示例
//但是这样做的话 constructor就会变成了Animal 所以在Object.create中可以把constructor定义
Tiger.prototype = myCreate(Animal.prototype);
let tiger = new Tiger();
console.log(tiger.type)

