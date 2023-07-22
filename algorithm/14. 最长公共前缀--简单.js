/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) return "";
  let res = "";
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length; j++) {
      if (strs[j][i] !== strs[0][i]) {
        return res;
      }
    }
    res += strs[0][i];
  }

  return res;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
