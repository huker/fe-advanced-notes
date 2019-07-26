function Parent(name) {
    console.log("Parent")
    this.name = name;
    this.color = ['red', 'blue'];
}
Parent.prototype.getName = function () {
    console.log(this.name);
};


function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

// Child.prototype = new Parent();
// Child.prototype.constructor = Child;

//效果一样 和上面两句
//但是上面的还是会重复new父类

Child.prototype.__proto__ = Parent.prototype;

let child1 = new Child('huk', 24);

child1.color.push('white');

console.log(child1.color, child1.name, child1.age);

let child2 = new Child('sieg', 25);

console.log(child2.color, child2.name, child2.age);



