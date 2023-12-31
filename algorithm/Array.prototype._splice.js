Array.prototype._splice = function (start, deleteCount) {
  // _splice函数入参元素个数
  let argumentsLen = arguments.length;
  // 数组
  let array = Object(this);
  // 数组长度
  let len = array.length;
  // 添加元素个数
  let addCount = argumentsLen > 2 ? argumentsLen - 2 : 0;
  // 计算有效的start
  let startIndex = computeSpliceStartIndex(start, len);
  // 计算有效的 deleteCount
  let delCount = computeSpliceDeleteCount(startIndex, deleteCount, len);
  // 记录删除的数组元素
  let deletedElements = new Array(delCount);

  //将待删除元素记录到deletedElements
  recordDeleteElements(startIndex, delCount, array, deletedElements);

  // 密封对象
  if (delCount !== addCount && Object.isSealed(array)) {
    throw new TypeError("the array is sealed");
  }

  // 冻结对象
  if (delCount > 0 && addCount > 0 && Object.isFrozen(array)) {
    throw new TypeError("the array is frozen");
  }

  // 移动数组元素
  moveElements(startIndex, delCount, array, addCount);

  let i = startIndex;
  let argumentsIndex = 2;

  // 插入新元素
  while (argumentsIndex < argumentsLen) {
    array[i++] = arguments[argumentsIndex++];
  }

  array.length = len - delCount + addCount;

  // 返回删除的元素数组；
  return deletedElements;
};

// 计算真实有效的 start
function computeSpliceStartIndex(start, len) {
  if (start < 0) {
    start += len;
    return start < 0 ? 0 : start;
  }
  // else start>=0
  return start > len - 1 ? len - 1 : start;
}

// 计算有效的 deleteCount
function computeSpliceDeleteCount(startIndex, deleteCount, len) {
  // 超出边界问题
  if (deleteCount > len - startIndex) {
    deleteCount = len - startIndex;
  }

  // 负值问题
  if (deleteCount < 0) deleteCount = 0;

  return deleteCount;
}

// 记录删除元素， 用于 Array.prototype._splice 的返回值
function recordDeleteElements(startIndex, delCount, array, deletedElements) {
  for (let i = 0; i < delCount; i++) {
    deletedElements[i] = array[startIndex + i];
  }
}

// 移动数组元素,便于插入新元素
function moveElements(startIndex, delCount, array, addCount) {
  let over = addCount - delCount;
  if (over) {
    // over>0
    //删除位置之后的元素还要向后移
    for (let i = array.length - 1; i >= startIndex + delCount; i--) {
      array[i + over] = array[i];
    }
  } else if (over < 0) {
    //删除位置之后的元素还要向前移
    for (let i = startIndex + delCount; i <= array.length - 1; i++) {
      if (i + Math.abs(over) > array.length - 1) {
        // 删除冗余元素
        delete array[i];
        continue;
      }
      array[i - Math.abs(over)] = array[i];
    }
  }
}

const months = ["Jan", "March", "April", "June"];
console.log(months._splice(1, 0, "Feb"));

console.log(months);
// ["Jan", "Feb", "March", "April", "June"]

console.log(months._splice(1, 3, "May"));
console.log(months);
