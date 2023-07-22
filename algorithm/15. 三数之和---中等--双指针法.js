/*

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

 

示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

let threeSum = function (nums) {
  if (nums.length === 0 || nums.length < 3) return [];
  nums.sort((a, b) => a - b);

  let res = [];
  let second, last;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    second = i + 1;
    last = nums.length - 1;
    while (second < last) {
      let sum = nums[i] + nums[second] + nums[last];
      if (sum === 0) {
        res.push([nums[i], nums[second], nums[last]]);
        //继续查找
        while (second < last && nums[second] == nums[second + 1]) {
          second++; //略过相同的数
        }
        second++; //指针移动，继续查找可能的结果

        while (second < last && nums[last] === nums[last - 1]) {
          last--; //略过相同的数
        }
        last--; //指针移动，继续查找可能的结果
      } else if (sum < 0) {
        second++;
      } else if (sum > 0) {
        last--;
      }
    }
  }

  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
