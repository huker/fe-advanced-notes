// const arr = require('./mock');

const restoreArray = function (adjacentPairs) {
    let arr = [];
    adjacentPairs.forEach((v) => {
        arr = arr.concat(v);
    })
    const startEndArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (startEndArr.length < 2) {
            const index = arr.indexOf(arr[i]);
            const lastIndex = arr.lastIndexOf(arr[i]);
            if (index === lastIndex) {
                startEndArr.push(arr[i])
            } else {
                arr.splice(index, 1);
                arr.splice(lastIndex - 1, 1);
            }
        }
    }
    let start = startEndArr[0];
    const end = startEndArr[1];

    let result = [];

    while (adjacentPairs.length > 0) {
        result.push(start);
        for (let i = 0; i < adjacentPairs.length; i++) {
            const v = adjacentPairs[i];
            if (v.includes(start)) {
                const index = v.indexOf(start) === 0 ? 1 : 0;
                start = v[index];
                adjacentPairs.splice(i, 1);
                break;
            }
        }
    }
    result.push(end);
    return result
};

const adjacentPairs = [[2, 1], [3, 4], [3, 2]];
// const adjacentPairs2 = [[4, -2], [1, 4], [-3, 1]];
// const adjacentPairs3 = [[100000, -100000]];
// const nums1 = restoreArray(arr);
const nums1 = restoreArray(adjacentPairs);
// const nums2 = restoreArray(adjacentPairs2);
// const nums3 = restoreArray(adjacentPairs3);


// console.log(nums1, nums2, nums3);
console.log(nums1);


// 第一次提交，问题：大量数据的时候会超时
// const restoreArray = function (adjacentPairs) {
//     let arr = [];
//     adjacentPairs.forEach((v) => {
//         arr = arr.concat(v);
//     })
//     const startEndArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (startEndArr.length < 2) {
//             const index = arr.indexOf(arr[i]);
//             const lastIndex = arr.lastIndexOf(arr[i]);
//             if (index === lastIndex) {
//                 startEndArr.push(arr[i])
//             } else {
//                 arr.splice(index, 1);
//                 arr.splice(lastIndex - 1, 1);
//             }
//         }
//     }
//     let start = startEndArr[0];
//     const end = startEndArr[1];
//
//     let result = [];
//
//     while (adjacentPairs.length > 0) {
//         result.push(start);
//         for (let i = 0; i < adjacentPairs.length; i++) {
//             const v = adjacentPairs[i];
//             if (v.includes(start)) {
//                 const index = v.indexOf(start) === 0 ? 1 : 0;
//                 start = v[index];
//                 adjacentPairs.splice(i, 1);
//                 break;
//             }
//         }
//     }
//     result.push(end);
//     return result
// };
