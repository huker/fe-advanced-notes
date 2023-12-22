
// 观察者模式的话 观察者和被观察者，是很多人观察一个人， 是一对多的关系， 内部含有发布订阅


// 观察者 爸爸妈妈  被观察者 孩子
// 孩子的变化要让观察者知道
// 观察者要缓存在被观察者里

class Subject {
    #watcher = [];
    #age = 10;
 
    changeAge() {
        this.#age++;
        this.#watcher.forEach((item)=>{
            item.notice(this.#age)
        })
    }
    addWatcher(item) {
        this.#watcher.push(item);
    }

}

class Observe {
    #name;
    constructor(name) {
        this.#name = name;
    }
    notice(age){
        console.log(`${this.#name}收到消息：现在的年龄:${age}`)
    }
}

const father = new Observe('father');
const mother = new Observe('mother');

const child = new Subject();
child.addWatcher(father);
child.addWatcher(mother);

child.changeAge();

