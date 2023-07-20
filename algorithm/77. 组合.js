/*
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

*/
var combine = function(n, k) {
    let res = [];
    let track = [];
    
    function backTrack(startIndex){
        if(track.length === k){
            res.push(track.slice());
            return; 
        }

        for(let i = startIndex; i <= n; i++){
            track.push(i);
            backTrack(i+1);
            track.pop();
        }

    }

    backTrack(1);
    return res;
};

console.log(combine(4,2));