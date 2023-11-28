let arr = [3, 6, 4, 2, 11, 10, 5];

// function sort() {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
// }

// 改进1 没有变化就提前退出
// function sort() {
//     for (let i = 0; i < arr.length; i++) {
//         let hasChange = true;
//         for (let j = 0; j < arr.length - i; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//                 hasChange = false;
//             }
//         }
//         if(hasChange){
//             break;
//         }
//     }
// }

// 改进2 进一步记录排序的位置
function sort() {
    for (let i = 0; i < arr.length; i++) {
        let hasChange = true;
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                hasChange = false;
            }
        }
        if(hasChange){
            break;
        }
    }
}
const result = sort();
console.log(arr)



