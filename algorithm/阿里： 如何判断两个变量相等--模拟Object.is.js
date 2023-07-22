// 使用 API： Object.is() 方法判断两个值是否为同一个值

// Object.is(x, y)

// Polyfill：

if (!Object.is) {
  Object.is = function (x, y) {
    // SameValue 算法
    if (x === y) {
      // 模仿Object.is的行为，当x,y 分别+0， -0时，
      // ‘===’ 符号会判断它们都和0相等，而Object.is 会判定为它俩不相等，且都不等于0;
      return x !== 0 || 1 / x === 1 / y;

      // 1/+0 ===1/-0
      // false
      // 1/-0 ===1/0
      // false

      // -0===0
      // true
      // +0===0
      // true
    } else {
      // 模仿Object.is的行为，两个变量同时是NaN时，Object.is判定这两个变量相等
      return x !== x && y !== y;
    }
  };
}

// https://www.dandelioncloud.cn/article/details/1577522001864781825
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
