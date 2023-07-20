// 二分搜索法，也叫折半搜索法
var findMedianSortedArrays = function(nums1, nums2) {
    if(nums1.length>nums2.length){
        return findMedianSortedArrays(nums2, nums1);
    }

    let m = nums1.length;
    let n = nums2.length;
    let left = 0, right = m;
    let median1 = 0, median2 =0;
    while(left<=right){
        let i = Math.floor((left+right)/2);
        let j = Math.floor((m+n+1)/2 -i);

        let nums_im1 = i===0 ? -Infinity : nums1[i-1];
        let nums_i = i===m? Infinity : nums1[i];
        let nums_jm1 = j===0 ? -Infinity : nums2[j-1];
        let nums_j = j===n ? Infinity : nums2[j];

        if(nums_im1<= nums_j){
            median1 = Math.max(nums_im1, nums_jm1);
            median2 = Math.min(nums_i, nums_j);
            left = i+1;
        }else{
            right = i-1;
        }
    }

    return (m+n)%2===0 ? (median1+median2)/2 : median1;
};

let nums1 = [1,2];
let nums2 = [3, 4];
// console.log(findMedianSortedArrays(nums1, nums2));

function flatten(arr, res= []){

    for(let item of arr){
        if (Array.isArray(item)){
            flatten(item, res);
        }else{
            res.push(item);
        }
    }
    return res;
}


function flatten2(arr){
    let res = [];
    for(let item of arr){
        if(Array.isArray(item)){
            res = res.concat(flatten2(item));
        }else{
            res.push(item);
        }
    }
    return res;
}

let arr = [1, 2, [3, [4,5]]];
console.log('flatten: ', flatten(arr));
console.log('flatten2: ',flatten2(arr));
