/* 
思路： 遍历高度数组中的元素，遍历到的当前元素为要求的矩形轮廓的高，再用双指针分别往两边找
大于等于这个高度的左右边界。最后：面积 = （右边界的index - 左边界的index + 1）* 当前元素的高。
在每次遍历时对面积进行Math.max比较， 取最大值，即为所求答案。
*/

var largestRectangleArea = function (heights) {
    let ans = 0;
    let n = heights.length;
    for(let i = 0; i< n; i++){
        let height = heights[i];
        let left = i, right = i;
        
        while(left-1>=0 && heights[left-1]>=height){
            left--;
        }
        while(right+1<n && heights[right+1]>=height){
            right++;
        }

        ans = Math.max(ans, (right-left+1)*height );
    }
    return ans;
}

console.log(largestRectangleArea([2,1,5,6,2,3]));