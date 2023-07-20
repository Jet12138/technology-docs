// https://leetcode.cn/problems/min-cost-to-connect-all-points/
// 解题方法是 Kruscal 算法

class DisjoinSetUnion {
    constructor(n) {
        this.n = n;
        this.rank = new Array(n).fill(1);
        this.f = new Array(n).fill(0).map((elem, index) => index);
    }

    find(x) {
        if (this.f[x] === x) {
            return x;
        }
        return this.find(this.f[x]);
    }

    unionSet(x, y) {
        let fx = this.find(x);
        let fy = this.find(y);
        if (fx === fy) {
            return false;
        }
        if (this.rank[fx] < this.rank[fy]) {
            [fx, fy] = [fy, fx];
        }

        this.rank[fx] += this.rank[fy];

        this.f[fx] = fy;
        return true;
    }
}

let minCostConnectPoints = function (points) {
    const dist = (x, y) => {
        return Math.abs(points[x][0] - points[y][0])+Math.abs(points[x][1] - points[y][1]);
    };

    let n = points.length;
    let edges = [];
    for(let i=0; i<n; i++){
        for(let j=i+1; j<n; j++){
            edges.push([dist(i, j), i, j]);
        }
    }

    edges.sort((a,b) => a[0]-b[0]);

    let res = 0;
    let num = 1;
    let dsu = new DisjoinSetUnion(n);

    for(let [length, i, j] of edges){
        if(dsu.unionSet(i, j)){
            res+=length;
            num++;
            if(num === n){
                break;
            }
        }
    }

    return res;
};
