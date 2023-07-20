/*

给定一个数字字符串 num，比如 "123456579"，我们可以将它分成「斐波那契式」的序列 [123, 456, 579]。

形式上，斐波那契式 序列是一个非负整数列表 f，且满足：

0 <= f[i] < 231 ，（也就是说，每个整数都符合 32 位 有符号整数类型）
f.length >= 3
对于所有的0 <= i < f.length - 2，都有 f[i] + f[i + 1] = f[i + 2]
另外，请注意，将字符串拆分成小块时，每个块的数字一定不要以零开头，除非这个块是数字 0 本身。

返回从 num 拆分出来的任意一组斐波那契式的序列块，如果不能拆分则返回 []。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/split-array-into-fibonacci-sequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

var splitIntoFibonacci = function(num) {
    let res = [];
    let track = [];

    function backTrack(startIndex){
        if(track.length >= 3 && startIndex ===num.length ){
            res = [...track];
            return;
        }
        for (let i = startIndex; i<num.length; i++){
            let curr = num.slice(startIndex, i+1);
            
            if(curr.length>1 && curr[0] ==='0') return;  //条件1： 0开头的，数字不等于0就退出
            curr = +curr; // 把 curr转成数字类型进行下面的数字范围判断
            if(curr<0 || curr >= 2**31) return;  //条件2： 超出范围，就退出
            
            if(track.length<2 || curr === (track[track.length-1] + track[track.length-2]) ){
                // 条件3：从第三个数开始进行F(i) = F(i-1)+F(i-2)的校验
                track.push(curr);
                backTrack(i+1);
                track.pop();
            }else {
                continue; // 这里不能直接break, 因为可能后续组成的数字满足前面的条件3。补充：其实这里的else可以不要的。
            }
        }
    }

    backTrack(0);
    return res;
};

console.log(splitIntoFibonacci('1101111'));
console.log(splitIntoFibonacci('123456579'));