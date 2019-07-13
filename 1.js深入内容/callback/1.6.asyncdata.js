/**
 * Created by huk on 2019/7/9.
 */

/**
 * 观察者模式
 * 一说到观察者模式就会想到vue 发布订阅
 * 观察者模式 包含了 发布订阅
 * 发布订阅是发布和订阅分开的 但是观察者模式 观察者和被观察者是联系在一起的
 *
 * 举例:家长（观察者） 和 小孩（被观察者）
 */

class Subject {
    constructor() {
        //小孩的状态
        this.state = 'happy';
        //小孩的观察者们
        this.observer = [];
    }

    //注册观察者 这就联系在一起了 要注册才会通知它
    attach(o) {
        //1
        this.observer.push(o);
    }

    //状态改变 并且通知
    setState(newState) {
        this.state = newState;
        //2 1、2这两段代码就是明显的发布订阅模式
        this.observer.forEach((o) => {
            o.update(newState)
        })
    }
}

class Observe {
    constructor(name) {
        this.name = name;
    }

    update(newState) {
        console.log(this.name + '收到小孩新状态:' + newState);
    }
}
//实例化两个观察者
let o1 = new Observe('爸爸');
let o2 = new Observe('妈妈');
let c = new Subject();
//注册到被观察者上
c.attach(o1);
c.attach(o2);
c.setState('sad!!');