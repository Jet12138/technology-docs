/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if(num1 === '0' || num2 ==='0') return '0';
    let m = num1.length, n = num2.length;

    // 最后结果的长度不会比这个更长了，最后的res 数组开头会多几个0，用replace替换掉。
    let res = new Array(m+n).fill(0);

    for (let i = m-1; i >= 0; i--){
        //我们小学学过的乘法当然是从最后一位开始来乘，经过减法转换成数字，之后进行惩罚；
        let n1 = num1[i]-'0';
        for(let j = n-1; j >= 0; j--){
            let n2 = num2[j]-'0';

            //开始乘了，先求出该位置上的应得积的值，再加上该位置上原有的值；
            let mult = res[i+j+1] + n1*n2;

            // 该积的值 除以 10 ，把余数留在该位置上；
            res[i+j+1] = mult % 10;


            // 该积的值 除以 10 ，把商留在该位置的前一个位置上；
            res[i+j] += Math.floor(mult/10);
        }
    }

    // res数组转换成字符串后，通过正则表达式把开头的所有0给替换为空字符串。打完收工。
    return res.join('').replace(/^0*/g, '');
};


multiply('123', '456');

var stringMultiply = function (nums1, nums2){
    if(nums1 === '0' || nums2 ==='0') return '0';
    let m = nums1.length;
    let n = nums2.length;
    let res = new Array(m+n).fill(0);

    for(let i = m-1; i>=0; i--){
        let n1 = nums1[i]-'0';

        for(let j = n-1; j>=0; j--){
            let n2 = nums2[j]-'0';

            let sum = res[i+j+1]+n1*n2;

            res[i+j+1] = sum%10;
            res[i+j] += Math.floor(sum/10);
        }
    }

    return res.join('').replace(/^0*/g, '');
};

stringMultiply('123', '456');

console.log(123*456);
console.log(stringMultiply('123', '456'));
