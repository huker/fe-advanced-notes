/**
 * Created by huk on 2019/7/23.
 */

// 会做this判断
// function Animal() {
//     if (!(this instanceof Animal)) {
//         throw Error('need new')
//     }
// }
// Animal()


class Animal {
    constructor(type) {
        //实例属性
        this.type = '哺乳类';
    }

    //原型方法 这函数不要在外面声明使用 this undefined （详情下面的注释）
    eat() {
        console.log("eat", this);
    }

    //es7语法 也是实例上的属性 ani.hasOwnProperty('a')为true
    // a = 1;

    //原型上的属性 ani.__proto__.hasOwnProperty('b') true
    get b() {
        return 200
    }

    //静态方法 Animal.say这样调用
    static say() {
        console.log("say")
    }

    //静态属性 加上get就变成了属性
    static get a() {
        return "hello"
    }
}

let ani = new Animal('哺乳类');

console.log(ani.b, Animal.say(), Animal.a);

/**
 * 这样调用this是undefined  因为规定了类原型上的方法拿出来的话 this是undefined
 * 可以通过bind来解决 就像react的click事件一样
 * 但是不要这样使用
 */
// let eat = ani.eat;
// eat();
// let eat2 = ani.eat.bind(ani);
// eat2();
// console.log(ani.type)