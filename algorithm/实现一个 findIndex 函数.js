/*

找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]中第一次出现的位置，
比如7第一次出现的位置是4


*/

// 思路，二分查找. 二分法的使用前提，施用受体是个已经排序的数组

function findIndex(arr, target) {
    let left = 0;
    let right = arr.length-1;
    let res = -1;

    while(left<=right){ // <= 代表折半查找，直到left = right (重合为一个)才停止
        let mid = Math.floor((left+right)/2);
        if(arr[mid]<target){
            left = mid+1;
        }else if(arr[mid]>target){
            right = mid-1;
        }else if(arr[mid]===target){
            res = mid;
            right = mid-1; //因为想往left的小方向再找找更早出现target的位置
        }
    }
    return res;
}


let arr =  [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67];
console.log(findIndex(arr, 7));  // 已完成