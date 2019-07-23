/**
 * Created by huk on 2019/7/22.
 */

/**
 *  es5 可以用构造函数 来 模拟类
 *  1.实例上的属性
 *  2.公共属性
 *  3.静态属性/静态方法 只能通过类来调用
 */
function Animal() {
    //这是实例上的属性
    this.type = '哺乳类';
    this.a = {};
    /**
     * 如果返回的是个对象 ani就是返回的结果
     * 如果返回的是普通值 比如 return '12' 那ani还是Animal实例
     */
    // return { a: 1 }
}
//公共属性
Animal.prototype.home = {};
Animal.prototype.fn = function () {
    console.log("haha")
}
//类是一类事物 ani是具体的一个实例
let ani1 = new Animal();
let ani2 = new Animal();
console.log(ani1.fn === ani2.fn)  //true home也是
console.log(ani1.a === ani2.a) //false 实例是独立的 不一样

/**
 *  prototype只有类上才有
 *  每个对象上都有__proto__  找所属类的原型 其实就是 .__proto__ = xx(所属类).prototype
 */
console.log(ani1.__proto__ === Animal.prototype) //true
console.log(Animal.prototype.__proto__ === Object.prototype) //true
console.log(Object.prototype.__proto__) //null 到根了

//Object.__proto__打出来是[Function]
console.log(Object.__proto__ === Function.prototype) //true
//Function.__proto__打出来也是[Function] 所以 Object.__proto__===Function.__proto__
console.log(Function.__proto__ === Function.prototype) //true
//数组 Array.prototype是他自己的对象
console.log(Array.prototype.__proto__ === Object.prototype); //true

/**
 * constructor
 * constructor是在prototype（原型）上的 指向构造函数
 */
console.log(Animal.prototype.constructor === Animal) //true
console.log(ani1.constructor === Animal) //true 获取的是类 不能拿到实例的属性 比如type


let a = {
    name: 123
}
let b = Object.create(a);
console.log(b.name)

b.name++;
console.log(b.name, a.name)
