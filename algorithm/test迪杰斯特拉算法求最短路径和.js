// 来源： https://leetcode.cn/submissions/detail/353982858/

let minCostConnectPoints = function (points) {
  let n = points.length;
  let dist = (x, y) => {
    return (
      Math.abs(points[x][0] - points[y][0]) +
      Math.abs(points[x][1] - points[y][1])
    );
  };
  let edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push([dist(i, j), i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);

  let dsu = new DisjoinSetUnion(n);
  let res = 0;
  let num = 1;
  for (const [length, x, y] of edges) {
    if (dsu.unionSet(x, y)) {
      res += length;
      num++;
      if (num === n) {
        break;
      }
    }
  }

  return res;
};

class DisjoinSetUnion {
  constructor(n) {
    this.n = n;
    this.f = new Array(n).fill(0).map((val, index) => index);
  }

  find(x) {
    // 并查集查找元素的根

    // 不断去查询自己的父亲节点, 直到到达根节点
    // 根节点的特点: f[x] == x  , f代表 father,其实我更喜欢用parent来表示
    while (this.f[x] !== x) {
      x = this.f[x];
    }
    return x;
  }

  unionSet(x, y) {
    let fx = this.find(x);
    let fy = this.find(y);
    if (fx === fy) {
      return false;
    }

    this.f[fy] = fx;
    return true;
  }
}

let points = [
  [0, 0],
  [2, 2],
  [3, 10],
  [5, 2],
  [7, 0],
];

console.log(minCostConnectPoints(points)); //20
