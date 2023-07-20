/*
请用算法实现，从给定的无需、不重复的数组A中，取出N个数，使其相加和为M。并给出算法的时间、空间复杂度，如：

var arr = [1, 4, 7, 11, 9, 8, 10, 6];
var N = 3;
var M = 27;

Result:
[7, 11, 9], [11, 10, 6], [9, 8, 10]

*/

var numSum = function(arr, N, M){
    if(arr.length < N ||!arr.length) return [];

    arr = arr.sort((a, b) => a-b);
    let res = [];
    let track = [];
    
    function backTrack(start){
        if(track.length===N){
            let count = track.reduce(function(prev, currVal, index){
                return prev+currVal;
            });
            if(count===M){
                res.push([...track]);
            }
        }
        for(let i=start; i<arr.length;i++){
            track.push(arr[i]);
            backTrack(i+1);
            track.pop(arr[i]);
        }
    }
    backTrack(0);
    return res;
}

let arr = [1, 4, 7, 11, 9, 8, 10, 6];
let N = 3;
let M = 27;

console.log(numSum(arr, N, M));
