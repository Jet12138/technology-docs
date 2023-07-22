//https://github.com/sisterAn/JavaScript-Algorithms/issues/118#:~:text=const%20arr%20%3D%20str.match(/(%5Cw)%5C1*/g)%0A%20%20%20%20const%20maxLen%20%3D%20Math.max(...arr.map(s%20%3D%3E%20s.length))

//写的正则很牛逼。
const maxRepeatLetter = (str) => {
  const arr = str.match(/(\w)\1*/g);
  const maxLen = Math.max(...arr.map((s) => s.length));
  const result = arr.reduce((pre, curr) => {
    if (curr.length === maxLen) {
      pre[curr[0]] = curr.length;
    }
    return pre;
  }, {});
  return result;
};
