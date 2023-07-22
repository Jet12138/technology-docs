// const result = { a: '1', b: '2', c: 'xx', d: '' };
// 拆解URL参数中queryString，返回一个 key - value 形式的 object

const url = "http://sample.com/?a=1&b=2&c=xx&d=#hash";

// 1. 正则
function getParams1(str) {
  let obj = {};
  str.replace(/([^?&=]+)=([^&]+)/g, function (match, key, val) {
    obj[key] = val;
  });

  return obj;
}

// console.log(getParams1(url));  // 已完成

// 2. 用 URLSearchParams api
function getParams2(str) {
  const [, search] = str.split("?");
  let res = {};
  for (let [key, val] of new URLSearchParams(search)) {
    res[key] = val;
  }
  return res;
}

// console.log(getParams2(url));  // 已完成

// 3. 纯纯用 split api拆解
function getParams3(str) {
  const [, search] = str.split("?");

  let res = {};
  if (search) {
    search.split("&").reduce((pre, curr) => {
      let [key, val] = curr.split("=");
      res[key] = val;
      return res;
    }, res);
  }

  return res;
}

console.log(getParams3(url)); // 已完成
