//寄生组合形式 借助中间创建一个空的fn 而不是走原本的prototype

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

let F = function () {
};

F.prototype = Parent.prototype;
Child.prototype = new F();

let child1 = new Child('huk', 24);

child1.color.push('white');
child1.getName()
console.log(child1.color, child1.name, child1.age);

let child2 = new Child('sieg', 25);

console.log(child2.color, child2.name, child2.age);


