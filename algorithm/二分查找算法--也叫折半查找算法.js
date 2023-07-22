function binarySearch(items, item) {
  let left = 0;
  let right = items.length - 1;
  let mid;
  let elem;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    elem = items[mid];

    console.log(mid);

    if (item > elem) {
      left = mid + 1;
    } else if (item < elem) {
      right = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// 折半查找需要用到已经排序好的数组，
// 折半查找的循环条件是left<=right
let sortedArr = [1, 2, 4, 5, 6, 6, 8, 9, 10];
console.log(binarySearch(sortedArr, 4)); //查询过程中 mid依次为4， 1， 2；
