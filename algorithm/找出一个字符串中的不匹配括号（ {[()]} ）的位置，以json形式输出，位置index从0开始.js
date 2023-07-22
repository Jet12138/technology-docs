// https://github.com/sisterAn/JavaScript-Algorithms/issues/144

// 找出一个字符串中的不匹配括号（ {[()]} ）的位置，以json形式输出，位置index从0开始。

// 异常输入
// ${{(3+5)*2+(5/(24)}
// 输出
// {
//     1: '{',
//     11: '(',
// }

// 正常输入
// [a+b]/${x}
// 输出
// {}

let s1 = "${{(3+5)*2+(5/(24)}";
let s2 = "[a+b]/${x}";
let s3 = "${(3+5)*2+(5/(24)}(}";
console.log(findBrackets(s1)); // {1: "{", 11: "("}
console.log(findBrackets(s2)); // {}
console.log(findBrackets(s3)); // {10: "(", 18: "(", 19: "}"}

function findBrackets(str) {
  let map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  let brackets = "()[]{}";

  let stack = [];
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (brackets.indexOf(str[i]) !== -1) {
      if (map[str[i]]) {
        // str[i]是左括号；
        stack.push([i, str[i]]);
      } else {
        // str[i]是右括号
        if (!stack.length) {
          //stack是空的，str[i]又是右括号，信息直接录入obj里。
          obj[i] = str[i];
        } else {
          //进行可能的匹配
          let end = stack.pop();
          if (map[end[1]] !== str[i]) {
            obj[end[0]] = end[1];
            i--; //下一个循环时还是对这个str[i] 与新的stack.pop()进行可能的匹配, 即：我们的目的是进行尽可能多的匹配。
          }
        }
      }
    }
  }

  for (let [key, val] of stack) {
    //把stack里剩余没匹配的括号信息也录入到obj里。
    obj[key] = val;
  }

  return obj;
}
