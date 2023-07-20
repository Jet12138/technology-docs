/*
    用的是官方题解中的解法二： 划分数组
    题解中i增大的方式是二分查找的方式，增大的比较快
*/

var findMedianSortedArrays = function(nums1, nums2) {
    if(nums1.length>nums2.length){
        return findMedianSortedArrays(nums2, nums1);
        // 这样的交换满足了题解中的假设： nums1.length<nums2.length;
        // 题解中：根据 j = (m+n+1)/2-i 的关系，如果nums1.length>nums2.length, 我们在[0, m=nums1.length]区间增大查找i时，j可能为负
    }
    let m = nums1.length,n = nums2.length;
    
    let left = 0, right = m;
    // median1是前一部分的最大值， median2是后一部分的最小值
    let median1 = 0, median2 = 0;
    while(left<= right){
        let i = Math.floor((left+right)/2);
        let j = Math.floor((m+n+1)/2-i);

        let nums_im1 = (i===0?-Infinity: nums1[i-1]);
        let nums_i = (i===m?Infinity: nums1[i]);
        let nums_jm1 = (j===0?-Infinity:nums2[j-1]);
        let nums_j = (j===n?Infinity: nums2[j]);

        if(nums_im1<=nums_j){
            median1 = Math.max(nums_im1,nums_jm1);
            median2 = Math.min(nums_i, nums_j);
            left = i+1;
        }else{
            right = i-1;
        }
    }

    return (m+n)%2 === 0 ? (median1+median2)/2 : median1;
};

console.log(findMedianSortedArrays([1,2], [3,4]));
console.log(findMedianSortedArrays([3,4], [1,2]));
console.log(findMedianSortedArrays([1,3], [2]));