/**
 * @param {string} s
 * @return {string}
 * 遍历，从中心往两边扩展： 
 思路来源： https://leetcode.cn/problems/longest-palindromic-substring/solution/by-bei-chen-8h-1b9m/
 */
var longestPalindrome = function(s) {
    let max='';
    let maxStr;
    
    function expandfromcenter(left, right){
        while(left>=0 && right < s.length && s[left]===s[right]){
            left--;
            right++;
        }
        maxStr = s.slice(left+1, right);
        if(maxStr.length > max.length) max=maxStr;
    } 

    for(let i = 0; i < s.length; i++){
        expandfromcenter( i, i);
        expandfromcenter(i, i+1);
    }
    
    return max;
};

console.log(longestPalindrome('abcbd'));
