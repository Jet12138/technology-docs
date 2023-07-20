/**
 * @param {number} n
 * @return {string[][]}
 *  V 2.0  

 一个皇后的攻击范围是皇后所在的行、列、左斜角线（撇pie）、右斜角线（捺na）。题目就是要求找到棋盘所有可以放置皇后的位置。

 需要先准备三个数组或Set集合，col[], pie[], na[]；或者col{}, pie{}, na{}。分别存放皇后占领某位置后影响的列，撇，捺的位置，其余皇后检索到这些位置则跳过，因为不符合规则。行因为DFS是按行检索，所以不需要存。

 列 j,很好处理，直接把 该皇后 的列坐标col[j]=1即可。
撇，来看看有什么规律，(0, 3)的撇相邻坐标为(1, 2)，再往下一个坐标是(2, 1)。可以看出撇的规则 为 i+j=c(常数)，此处常数为3，即i+j=3标记即可。我们用set.add(i+j);
捺，同理撇找规律。 图中皇后第一个相邻的捺坐标为(1, 4)，下一个捺坐标为(2, 5)，即 j-i=c(常数)，此处常数为3。即j-i=3。我们用set.add(j-i);
 */
var solveNQueens = function(n) {
    let res = [];
    // "." 表示空，"Q" 表示放置皇后，初始化空棋盘。
    let board = new Array(n).fill('.').map(elem =>new Array(n).fill('.')); // tmd，这一步导致了好多的错误，array的性质是引用类型的数据，该题的结果要求的二维数组，所以要各个数组都是独立的，不能是重复的，那样会引用到相同的array数据，这个bug恶心了我一天，最后用了map解决了，原来的错误写法是:new Array(n).fill(new Array(n)) 和new Array(n).fill(new Array(n).fill('.'))

    let cols = new Set();
    let pie = new Set();
    let na = new Set();

    function backTrack(row){
        //触发终止条件
        if(row === n){
            res.push(board.map(elem=> elem.join('')) );
            return;
        }
        for(let col = 0; col < n; col++){
            if(cols.has(col) || pie.has(col+row) || na.has(col-row)){
                continue;
            }

            // 做选择，放置皇后
            cols.add(col);
            pie.add(col+row);
            na.add(col-row);
            board[row][col] = 'Q';
            // 进入下一行决策；
            backTrack(row+1);
            //撤销选择，不放置皇后
            cols.delete(col);
            pie.delete(col+row);
            na.delete(col-row);
            board[row][col] = '.';
        }
    }

    backTrack(0);
    return res;
};

console.log(solveNQueens(4));