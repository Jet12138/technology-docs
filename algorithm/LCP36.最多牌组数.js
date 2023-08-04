/* LCP 36. 最多牌组数

麻将的游戏规则中，共有两种方式凑成「一组牌」：

顺子：三张牌面数字连续的麻将，例如 [4,5,6]
刻子：三张牌面数字相同的麻将，例如 [10,10,10]
给定若干数字作为麻将牌的数值（记作一维数组 tiles），请返回所给 tiles 最多可组成的牌组数。

注意：凑成牌组时，每张牌仅能使用一次。

示例 1：

输入：tiles = [2,2,2,3,4]

输出：1

解释：最多可以组合出 [2,2,2] 或者 [2,3,4] 其中一组牌。

示例 2：

输入：tiles = [2,2,2,3,4,1,3]

输出：2

解释：最多可以组合出 [1,2,3] 与 [2,3,4] 两组牌。 

*/

/**
 * @param {number[]} tiles
 * @return {number}

思路来源链接：https://leetcode.cn/problems/Up5XYM/solutions/714023/gei-zui-gao-zan-de-ti-jie-jia-liao-zhu-s-jnsr/

 */
var maxGroupNumber = function (tiles) {
  let k = 5; // 0, 1, 2, 3, 4。

  let map = new Map();
  for (let el of tiles) {
    map.set(el, (map.get(el) || 0) + 1);
  }
  let newTiles = [...map].sort((a, b) => a[0] - b[0]);

  // dp[x][y] 表示在预留x张 [tile-2] 和y张 [tile-1] 的前提下，[tile] 与之前预留的牌{tile-2, tile-1}能组成的最多牌组数
  let dp = new Array(k).fill(-1).map(() => new Array(k).fill(-1));
  dp[0][0] = 0;

  let last = 0;

  for (let [tile, tileNum] of newTiles) {
    // 当前点数无法与前面的点数组成顺子，只保留(0,0)的情形。
    if (last !== tile - 1) {
      // dp[0][0] 表示，之前留下的 “tile-2点的牌数” 和 “tile-1点的牌数” 都为0
      // dp[x][y] == -1 表示，之前没有 “留下x张[tile-2]点和y张[tile-1]点” 的情况。

      let dp00 = dp[0][0];
      dp = new Array(k).fill(-1).map(() => new Array(k).fill(-1));
      dp[0][0] = dp00;
    }

    let newDp = new Array(k).fill(-1).map(() => new Array(k).fill(-1));

    for (let tile_less2 = 0; tile_less2 < k; tile_less2++) {
      // [tile-2]牌的预留数量
      for (let tile_less1 = 0; tile_less1 < k; tile_less1++) {
        // [tile-1]牌的预留数量
        if (dp[tile_less2][tile_less1] < 0) {
          // dp[x][y] == -1 表示，之前没有 “留下x张[tile-2]点的和y张[tile-1]点” 的情况
          continue;
        }

        for (
          let shunzi = 0;
          shunzi <= Math.min(tile_less2, tile_less1, tileNum);
          shunzi++
        ) {
          //先遍历tile与前面的牌组成顺子的可能数目；
          //下一个状态的dp矩阵的行index 就是此刻的tile-1,所以他们的数目关系就是，tile-1的数目tile_less1减去穷举列出的shunzi数目。
          let next_tile_less2 = tile_less1 - shunzi;

          // 同理，对于下一个点数 [next_tile] 而言，next_tile_less1 代表预留的 [next_tile - 1] 的牌数，
          // 也就是为下一轮 next_tile 预留的 [tile] 的数量：下一个状态的dp矩阵的列index
          for (
            let next_tile_less1 = 0;
            next_tile_less1 <= Math.min(4, tileNum - shunzi);
            next_tile_less1++
          ) {
            // 新的牌组数等于以下三者相加：
            // 1. 上一个dp数组保存的，留下 tile_less2 张 [tile-2] 和 tile_less1 张 [tile-1] 的前提下，tile-1 之前的牌面能凑出来的牌组数
            // 2. 顺子数量  :shunzi
            // 3. [tile] 组成的刻子数量 = ( [tile]数量 - 顺子数量 - 留下备用的牌 ) / 3
            let new_core =
              dp[tile_less2][tile_less1] +
              shunzi +
              Math.floor((tileNum - shunzi - next_tile_less1) / 3);
            newDp[next_tile_less2][next_tile_less1] = Math.max(
              newDp[next_tile_less2][next_tile_less1],
              new_core
            );
          }
        }
      }
    }

    dp = newDp;
    last = tile;
  }

  let ans = 0;
  for (let row = 0; row < k; row++) {
    for (let col = 0; col < k; col++) {
      ans = Math.max(ans, dp[row][col]);
    }
  }

  return ans;
};
