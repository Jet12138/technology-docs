// Prim 算法作解法
// 解题思路来源：https://leetcode.cn/problems/min-cost-to-connect-all-points/solution/prim-and-kruskal-by-yexiso-c500/
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    let n = points.length;
    let res = 0;
    let g = new Array(n).fill(0).map(elem => new Array(n).fill(0));
    // 1. 将points转化成邻接矩阵, 这一步可有可无
    for(let i = 0; i< n; i++){
        for(let j = i+1; j< n;j++){
            let dist = Math.abs(points[i][0]-points[j][0])+
                Math.abs(points[i][1]-points[j][1]);
            g[i][j] = dist;
            g[j][i] = dist;
        }
    }

    // 记录V[i]到Vnew的最近距离
    let lowcost = new Array(n).fill(Infinity);
    // 记录V[i]是否加入到了Vnew
    let v = new Array(n).fill(-1);

    // 2. 先将start[: 0]加入到Vnew
    v[0] = 0;
    for(let i = 0; i< n; i++){
        if(i=== 0) continue;
        lowcost[i] = g[i][0];
    }

    // 3. 剩余n - 1个节点未加入到Vnew，遍历;
    for(let i = 1; i<n; i++){
        // 根据lowcost 找出此时V中离Vnew最近的点
        let minIdx = -1;
        let minVal = Infinity;
        for(let j = 0; j<n; j++ ){
            if(v[j] === 0) continue; //说明已经加入了 Vnew， 不用遍历该点了。
            if(lowcost[j]<minVal){
                minIdx = j;
                minVal = lowcost[j];
            }
        }

        //将该点加入Vnew, 更新lowcost和v;
        res += minVal;
        v[minIdx] = 0; //等于0表示已加入Vnew中；
        lowcost[minIdx] = -1; //等于-1表示已加入Vnew中；

        //更新集合V中所有点的lowcocost
        for(let j = 0; j< n; j++){
            if(v[j]===-1 && g[j][minIdx] < lowcost[j]){
                lowcost[j] = g[j][minIdx];
            }
        }
    }

    return res;
}