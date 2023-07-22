let arrayToSort = [6, 1, 10, 5, 6, 9, 4, 8, 2];
// 六个算法： 插入排序和归并排序是稳定的，其他的是不稳定的。
// 1. 插入排序  稳定
function insertionSort(arr) {
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let preindex = i - 1; // preindex是current 索引的前面一位

    // 遍历preindex,当 arr[preindex]比current大， 进行下面的后挪操作
    while (preindex >= 0 && arr[preindex] > current) {
      // 把arr[preindex]往后挪一位
      arr[preindex + 1] = arr[preindex];
      preindex--;
    }
    // 上面的while结束时，发现了arr[preindex] <= current;
    // 此时的preindex后面一位就是current要插入的排序位置；
    arr[preindex + 1] = current;
  }

  return arr;
}

// console.log( insertionSort(arrayToSort) );  //已成功

// 2. 希尔排序  不稳定
function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    //插入排序
    for (let i = gap; i < n; i++) {
      let current = arr[i];
      let j = i;
      while (j - gap >= 0 && arr[j - gap] > current) {
        //这个写法像上面的插入排序
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = current;
    }
  }

  return arr;
}

// console.log( shellSort(arrayToSort) );  //已成功

// 2---改动. 希尔排序，我个人喜欢这种语义化清晰的写法，不喜欢上面的希尔排序
function shellSort233(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    //插入排序
    for (let i = gap; i < n; i++) {
      let current = arr[i];
      let preindex = i - gap;
      while (preindex >= 0 && arr[preindex] > current) {
        //这个写法像上面的插入排序
        arr[preindex + gap] = arr[preindex];
        preindex -= gap;
      }
      arr[preindex + gap] = current;
    }
  }

  return arr;
}

// console.log( shellSort233(arrayToSort) );  //已成功

// 3. 归并排序   稳定
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let res = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }

  if (left.length > 0) {
    res.push(left.shift());
  }

  if (right.length > 0) {
    res.push(right.shift());
  }

  return res;
}

console.log("归并排序：mergeSort：", mergeSort(arrayToSort)); //已成功

// 4. 堆排序
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function heapify(arr, n, i) {
  //建的是小顶堆
  // n 代表arr里面有n个节点。
  // i 代表要对第i个节点做堆化操作 (根索引是从0开始的)
  // 自上而下式堆化
  if (i >= n) {
    return;
  }
  let c1 = 2 * i + 1; //从0开始为大顶堆/小顶堆的根节点开始排索引的情况下，c1是i节点的左子节点的索引
  let c2 = 2 * i + 2;
  let minindex = i;
  if (c1 < n && arr[c1] < arr[i]) {
    minindex = c1;
  }
  if (c2 < n && arr[c2] < arr[minindex]) {
    minindex = c2;
  }
  if (i !== minindex) {
    swap(arr, i, minindex);
    // i = minindex;
    heapify(arr, n, minindex);
  }
}

function build_heap(arr, n) {
  // 从后往前， 自上而下式健堆
  let lastnode = n - 1;
  let lastparent = Math.floor((lastnode - 1) / 2);
  for (let i = lastparent; i >= 0; i--) {
    heapify(arr, n, i);
  }
}

function heap_sort(arr) {
  let n = arr.length;
  build_heap(arr, n);

  let lastnode = n - 1;
  for (let i = lastnode; i >= 0; i--) {
    swap(arr, 0, i); //
    heapify(arr, i, 0);
  }

  //由于heapify是建小顶堆的，所以上面的for里面每次swap后总是把最小的交换到arr后面,
  //导致结果是从大到小的排序
  // return arr;

  return arr.reverse(); //返回从小到大的排列
}

// console.log( heap_sort(arrayToSort) );   //已成功

// 5. 选择排序
function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 寻找最小的数
        minIndex = j; // 将最小数的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

// console.log( selectionSort(arrayToSort) );   //已成功

// 6. 快速排序：基于二分法
var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
};

// console.log( quickSort(arrayToSort) );   //已成功
