// 多少对
function rabbit(n) {
    if (n <= 1) {
        return 1
    } else {
        return rabbit(n - 1) + rabbit(n - 2)
    }
}

const result = rabbit(4);

console.log(result)


