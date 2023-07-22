var restoreIpAddresses = function (s) {
  let track = [];
  let res = [];

  function backtrack(start) {
    if (track.length === 4 && start === s.length) {
      res.push(track.join("."));
      return;
    }
    if (track.length > 4) return;
    for (let i = start; i < s.length; i++) {
      if (i - start > 3) return;
      const num = s.slice(start, i + 1);
      if (num.length > 3 || +num > 255) return;
      if (num.length > 1 && num[0] === "0") return;
      // 三位一组
      track.push(num);
      backtrack(i + 1);
      track.pop();
    }
  }

  backtrack(0);
  return res;
};

console.log(restoreIpAddresses("101023"));
