/**
 * Created by huk on 2019/7/23.
 */


/**
 * 继承
 * 类是单继承的 只能extends一个类 （写别的时候时候extends几个的是接口）
 * 类的特点：封装 继承 多态
 */

class Animal {
    constructor(type) {
        this.type = type;
    }

    eat() {
        console.log("eat");
    }

    static fn() {
        console.log("fn")
    }

    static get a() {
        return 200
    }
}

class Tiger extends Animal { //call + Object.create
    /**
     * 如果子不写constructor的话参数就会传给Animal的constructor
     * super就是在调父类 super.call(this， 但是这边的this已经是自己了 所以不用
     *
     * super在构造函数和静态方法中是父类
     * 在原型方法中是父类的原型
     */
    constructor(type) {
        super(type);
    }

    //多态 先找自己的方法 有就直接用 没有再往上面找（不能称之为重写 因为Animal的eat还在的）
    eat() {
        //这样去调父的方法
        super.eat();
        console.log("吃肉")
    }

    static fn(){
        super.fn();
        console.log("fn new")
    }
}
//可以拿到父类的静态属性和方法 因为是Tiger.__proto__ =Animal 链指向类
console.log(Tiger.fn(), Tiger.a)

// let tiger = new Tiger('哺乳类');
// console.log(tiger.type);
// console.log(tiger.eat());
