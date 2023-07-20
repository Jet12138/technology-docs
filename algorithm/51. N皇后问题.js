// 回溯法； 难度：困难；
let solveNQueens = function(n) {
    let res = [];
    // "." 表示空，"Q" 表示放置皇后，初始化空棋盘。
    let board = new Array(n).fill('.').map(elem =>new Array(n).fill('.')); 
    /*
        tmd，这一步导致了好多的错误，array的性质是引用类型的数据，该题的结果要求的二维数组，
        所以要各个数组都是独立的，不能是重复的，那样会引用到相同的array数据，
        这个bug恶心了我一天，最后用了map解决了，
        原来的错误写法是: let board = new Array(n).fill(new Array(n)) ;
        和 let board = new Array(n).fill(new Array(n).fill('.'));
    */
    function isValid(row, col){
        // 检查一列正上方有没有 'Q' ；
        for(let i=row; i>=0; i--){
            if(board[i][col] === 'Q') return false;
        }
        
        //检查右上方斜线位置上有没有 'Q';
        for(let i = row, j = col; i>=0 && i<n; i--,j++){
            if(board[i][j] === 'Q') return false;
        }

        //检查左上方斜线位置上有没有 'Q';
        for(let i = row, j = col; i>=0 && j>=0; i--,j--){
            if(board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backTrack(row){
        //触发终止条件
        if(row === n){
            res.push(board.map(elem => elem.join(''))); 
            return;
        }
       
        for(let col = 0; col < n; col++){
            if(isValid(row, col)){
                // 做选择，放置皇后
                board[row][col] = 'Q';
                // 进入下一行决策；
                backTrack(row+1);
                //撤销选择，不放置皇后
                board[row][col] = '.';
            }
        }
    }

    backTrack(0);
    return res;
};

console.log(solveNQueens(4));