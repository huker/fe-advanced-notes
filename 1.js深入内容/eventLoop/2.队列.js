/**
 * Created by huk on 2019/7/27.
 */

/**
 * 定义后把对应执行上下文放入执行栈中 a b c这个顺序依次放入
 * 销毁的时候是 c b a的顺序 （全局是等到浏览器关闭才销毁）
 *
 * 模拟执行栈：
 * ----------
 * - c
 * --------
 * - b
 * --------
 * - a
 * ---------
 * - 全局
 * ----------
 *
 */

function a() {
    let x = 1;
    function b() {
        console.log(x)
        function c() {
            console.log('>>')
            debugger
        }

        c()
    }

    b()
}

a()