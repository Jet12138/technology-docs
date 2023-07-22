function removeDuplicate(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let last = stack.pop();
    if (!last || last[0] !== s[i]) {
      stack.push(last);
      stack.push(s[i]);
    } else if (last[0] === s[i + 1]) {
      stack.push(last + s[i]);
    }
  }

  return stack.join("");
}

//第二种写法：
function removeDuplicate2(s) {
  let stack = [];
  let i = 0;

  while (i < s.length) {
    let last = stack.pop();
    if (s[i] === last) {
      while (s[i] === last) {
        i++;
      }
    } else {
      stack.push(last);
      stack.push(s[i]);
      i++;
    }
  }

  return stack.join("");
}

console.log(removeDuplicate("abbbaca")); // 期望结果： "ca"
