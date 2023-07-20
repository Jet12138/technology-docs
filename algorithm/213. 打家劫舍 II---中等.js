/*
我脑中的第一想法是既然房屋首尾相连，那么分别正着计算[0, n-2] 和倒着计算 [n-1, 1]这两段的房屋被打劫的
总金额， 再对两个总金额求最大值就行了。
具体求每一段时还是用动态规划的思路。dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i]).
其实看了官方题解，正着计算和倒着计算都可以正着计算，即[0, n-2], [1, n-1]
并且，求每一段的总金额的算法还可以抽取成函数，更简便了。
*/

var rob2 = function (nums) {
    if(nums===null || nums.length === 0) return 0;
    if(nums.length === 1) return nums[0];
    if(nums.length === 2) return Math.max(nums[0],nums[1]);

    let n = nums.length;
    
    function getpiecemaxdp(start, end){
        let dp = new Array(n);
        dp[start] = nums[start];
        dp[start+1] = Math.max(nums[start], nums[start+1]);
        for(let i = start+2; i <= end; i++){
            dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i]);
        }
        return dp[end];
    }
   
    return Math.max(getpiecemaxdp(0, n-2), getpiecemaxdp(1,n-1));
}

console.log(rob2([3]));
console.log(rob2([2,3,2]));   // 3
console.log(rob2([1,2,3,1])); // 4