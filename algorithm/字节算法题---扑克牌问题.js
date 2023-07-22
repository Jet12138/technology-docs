/*

魔术师手中有一堆扑克牌，观众不知道它的顺序，接下来魔术师：

从牌顶拿出一张牌， 放到桌子上
再从牌顶拿一张牌， 放在手上牌的底部
如此往复（不断重复以上两步），直到魔术师手上的牌全部都放到了桌子上。

此时，桌子上的牌顺序为： (牌顶) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌底)。

问：原来魔术师手上牌的顺序，用函数实现。

*/
let calc = (arr) =>{
    let n = arr.length;
    let res = [];
    for(let i = 0; i<n; i++){
        if(res.length){
           
            res.unshift(res.pop());
        }
        
        res.unshift(arr.shift())
    }

    return res;
}



let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13];
// 已完成
console.log(calc(arr));  // [13, 2, 12, 6, 11, 3, 10, 5, 9, 1, 8, 4, 7]

let calc2 = (arr) => {
    let res = [arr.shift()];
    for(let i = 0; i<12; i++){
        res.unshift(res.pop());
        res.unshift(arr.shift())
    }

    return res;
}

// console.log(calc2(arr)); // 已完成 [13, 2, 12, 6, 11, 3, 10, 5, 9, 1, 8, 4, 7]
