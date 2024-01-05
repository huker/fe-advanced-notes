const data = [{ "count": 424, "name": "盐城大丰新南阳医院", "coordinates": [120.544373, 33.130775] }, { "count": 375, "name": "盐城大丰长江医院", "coordinates": [120.380953, 33.182162] }, { "count": 266, "name": "三龙医院", "coordinates": [120.52377, 33.424162] }, { "count": 228, "name": "盐城市大丰区南阳镇卫生院", "coordinates": [120.545273, 33.129271] }, { "count": 27, "name": "大丰斗龙医院", "coordinates": [120.593082, 33.468266] }, { "count": 12, "name": "盐城市大丰区小海中心卫生院", "coordinates": [120.486293, 33.03771] }, { "count": 3, "name": "大丰区白驹中心卫生院", "coordinates": [120.314741, 33.081123] }];

// [424, 375, 266, 228, 27, 12, 3]
const dataCount = data.map(v => v.count);
const totalCount = dataCount.length;
const level1Percent = 0.2;
const level2Percent = 0.3;

const level1Index = Math.round(totalCount * 0.2) - 1;
const level2Index = Math.round(totalCount * 0.5) - 1;

// level1  [0, level1Index]
// level2  [level1Index+1, level2Index]
// level3  [level2Index+1, totalCount-1]

let level1 = calcCenterCount(dataCount[level1Index], dataCount[level1Index + 1]);
let level2 = calcCenterCount(dataCount[level2Index], dataCount[level2Index + 1]);

function calcCenterCount(pre, next) {
    let value = (pre + next) / 2;
    let minus = pre - next;
    let magnitude = Math.floor(Math.log10(minus));

    return Math.round(value, -magnitude);
}



