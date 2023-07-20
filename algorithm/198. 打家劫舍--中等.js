/*
动态规划：
对于第 k (k>2) 间房屋，有两个选项：

  1. 偷窃第 k 间房屋，那么就不能偷窃第 k−1 间房屋，偷窃总金额为前 k−2 间房屋的最高总金额与第 k 间房屋的金额之和。

  2. 不偷窃第 k 间房屋，偷窃总金额为前 k−1 间房屋的最高总金额。

在两个选项中选择偷窃总金额较大的选项，即为前 k 间房屋能偷窃到的最高总金额。

用 dp[i] 表示前 i 间房屋能偷窃到的最高总金额，那么就有如下的状态转移方程：

dp[i]=max(dp[i−2]+nums[i],dp[i−1])

作者：LeetCode-Solution
链接：https://leetcode.cn/problems/house-robber/solution/da-jia-jie-she-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


*/

var rob = function(nums) {
    let dp = new Array(nums.length);
    if(nums.length === 1) return nums[0];
    if(nums.length === 2) return Math.max(...nums);

    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    console.log(dp);

    for(let i = 2; i< nums.length; i++){
        dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i]);
    }
    
    return dp[nums.length - 1];
};

console.log(rob([1]));
console.log(rob([1,3]));
console.log(rob([0,0]));
console.log(rob([1,3,9]));
console.log(rob([1,2, 3, 1]));
console.log(rob([3, 1, 1,3,9]));