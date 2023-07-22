//  https://github.com/sisterAn/JavaScript-Algorithms/issues/124

const arr = [101, 19, 12, 51, 32, 7, 103, 8];

// 1. 最大连续升序的数量
function findMaxSeriesNum(arr) {
  if (arr.length <= 1) return arr.length;

  let res = 1;
  let start = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      res = Math.max(res, i - start);
      start = i;
    }
  }
  return res;
}

// console.log(findMaxSeriesNum(arr))// 2 ;已完成

// 2. 最大不连续升序的数量
function findMaxNotSeriesNum(arr) {
  if (arr.length <= 1) return arr.length;

  let res = 1;
  let start;
  let count;
  for (let i = 0; i < arr.length - 1; i++) {
    start = arr[i]; // 不断地假设arr[i]为序列起始的最小值，来试探地搜索最大不连续上升序列的长度
    count = 1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > start) {
        count++;
        start = arr[j];
      }
    }
    res = Math.max(res, count);
  }

  return res;
}

console.log(findMaxNotSeriesNum(arr)); // 3 ;已完成
