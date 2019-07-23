/**
 * Created by huk on 2019/7/23.
 */


let arr = [1, 2, [3, 4, [5, 6]]];
function flat(target, num) {
    num--;
    return target.reduce((prev, next) => {
        if ((next instanceof Array) && num > 0) {
            return prev.concat(flat(next, num))
        } else {
            return prev.concat(next)
        }
    }, [])
}
console.log(flat(arr, 2));