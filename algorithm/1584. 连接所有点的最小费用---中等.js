// https://leetcode.cn/problems/min-cost-to-connect-all-points/
// 并查集的知识： https://www.runoob.com/data-structures/union-find-rank.html
// 解题方法是 Kruscal 算法

class DisjoinSetUnion {
    constructor(n) {
        this.n = n;
        this.rank = new Array(n).fill(1);           // rank[i]表示以i为根的集合所表示的树的层数
        this.f = new Array(n).fill(0).map((elem, index) => index);      // f（ather）[i] 或者 parent[i]表示第i个元素所指向的父节点, 初始化时都是指向自身
    }

    find(x) {
        if (this.f[x] === x) {
            return x;
        }
        return this.find(this.f[x]);

        //另一种写法：
        // 不断去查询自己的父亲节点, 直到到达根节点
        // 根节点的特点: parent[p] == p
        // while( p != this.f[p] ){
        //     p = this.f[p];
        // }   
        // return p;
    }

    unionSet(x, y) {
        let fx = this.find(x);
        let fy = this.find(y);
        if (fx === fy) {
            return false;
        }
        if (this.rank[fx] < this.rank[fy]) {
           this.f[fx] = fy;
        }else if (this.rank[fy] < this.rank[fx]){
            this.f[fy] = fx;
        }else{  // this.rank[fx] === this.rank[fy];
            this.f[fx] = fy;
            this.rank[fy]+=1;  //因为两个的层数都相等，所以强制连接后，肯定是层级加了一层。
        }
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
            edges.push([dist(i, j), i, j]);   // i，j是单向的，i一定小于j
        }
    }

    edges.sort((a,b) => a[0]-b[0]);// 让边从短到长的排列，edges里的每个成员：即：边后面的i，j 相当于 没有顺序，是打乱的。

    let res = 0;
    let num = 1;
    let dsu = new DisjoinSetUnion(n);

    for(let [length, i, j] of edges){       //边的长度从短到场长，依次遍历
        if(dsu.unionSet(i, j)){    //如果新的边代表的两个点，其中的新点可以加入这个并查集树，则点的个数num++,如果num==n则所有点都加入到一棵树里面的，这棵树就是最短路径的树
            res+=length;
            num++;
            if(num === n){
                break;
            }
        }
    }

    return res;
};
