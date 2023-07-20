/*
    思路： 回溯法： 如果元素包含在nums数组中就continue，如果没包含在，就add,然后进入下一次backTrack，
    每次backTrack 都是一次遍历选择元素的过程。
*/
var permute = function(nums) {
    let ans = [];
    let track = [];

    function backTrack(){
        if(track.length === nums.length){
            ans.push(track.slice());
            return ;
        }

        for(let i = 0;i<nums.length; i++){
            if(track.includes(nums[i])) continue;

            track.push(nums[i]);
            backTrack();
            track.pop();
        }
    }

    backTrack();
    return ans;
};

console.log(permute([1,2,3]));