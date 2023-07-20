/*

来源：https://zhuanlan.zhihu.com/p/202578961
给定一个整数序列，找到最长上升子序列（LIS），返回LIS的长度。

说明:

最长上升子序列的定义：

最长上升子序列问题是在一个无序的给定序列中找到一个尽可能长的由低到高排列的子序列，这种子序列不一定是连续的或者唯一的。

样例 1:
	输入:  [5,4,1,2,3]
	输出:  3
	
	解释:
	LIS 是 [1,2,3]

样例 2:
	输入: [4,2,4,5,3,7]
	输出:  4
	
	解释: 
	LIS 是 [2,4,5,7]

*/
var longestIncreasingSubsequence = function (nums) {
    // dp[i]表示以nums[i]为结尾的最长上升子序列的长度
    let dp = new Array(nums.length);
    let ans = 0;
    for(let i = 0; i < nums.length; i++){
        dp[i]=1; // 每个位置初始值为 dp[i]=1（将自己作为一个序列）
        for(let j = 0; j < i; j++){
            if(nums[j] < nums[i]){
                // 若nums[j] < nums[i] ，那么nums[i]可以接在该序列后；更新dp[i]的状态
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
        // 记录所有状态中的最大值
        if(dp[i]>ans){
            ans = dp[i]
        } 
    }
    return ans;
}

console.log(longestIncreasingSubsequence([5,4,1,2,3]));

console.log(longestIncreasingSubsequence([4,2,4,5,3,7]));