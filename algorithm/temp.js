//解题思路
// 要想使得兔子数量最小，那么尽量将报同样数量的视为同一颜色，但为了不矛盾，需要使用map记录对应颜色兔子最大的出现次数
// 报0的兔子一定是独一无二的直接++
//
// 作者：wanyuxuan
// 链接：https://leetcode-cn.com/problems/rabbits-in-forest/solution/yi-bian-xun-huan-mapji-lu-by-wanyuxuan/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// function countRabbit(arr){
//   const map = new Map();
//   let res =0;
//   for(let elem of arr){
//     if(elem===0){
//       res++;
//     }else if(!map.has(elem)){
//       res= res+(elem+1);
//       map.set(elem, elem);
//     }else {
//       map.set(elem, map.get(elem)-1);
//       if(map.get(elem) === 0){
//         map.delete(elem);  //delete之后如果还有相同的elem,那么就可以重新map.set(elem, elem)了。
//       }
//     }
//   }
//   return res;
// }


//发牌算法：补充，后续如果要剩余几张牌的话，再改。
// function dealpoker(pokercount, playersnum){
//   const pokervalue = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//   const pokertype = ['黑桃', '红桃', '方块', '梅花'];
//
//
//   let pokerset = new Array(pokercount);
//   let range = pokercount/ playersnum;
//
//   for(let i = 0; i< pokerset.length; i++){
//     pokerset[i] =  pokertype[Math.floor(i/ range)]+pokervalue[i % range];
//   }
//   let result = [];
//   for(let i=0;i< playersnum; i++){
//     result[i] = [];
//     for(let j =0; j<range;j++){
//       result[i].push(pokerset.splice(Math.floor(pokerset.length*Math.random()), 1)[0]);
//       // if(pokerset.length === restnum){
//       //   console.log('剩余的牌是: '+pokerset);
//       //   return ;
//       // }
//     }
//     console.log('player'+i+1+'的牌组是: '+result[i]);
//   }
// }
//
// dealpoker(52, 4);

//1. 广度优先遍历 BFS (breath first search)

let widthTraversals = (node) => {
    let nodes = [];
    let queue = [];
    if (node) {
        queue.push(node);
        while (queue.length) {
            let item = queue.shift();
            nodes.push(item);
            let children = item.children;
            // 队列，先进先出
            // nodes = [] queue = [parent]
            // nodes = [parent] queue = [child1,child2,child3]
            // nodes = [parent, child1] queue = [child2,child3,child1-1,child1-2]
            // nodes = [parent,child1,child2]
            for (let i = 0; i < children.length; i++) {
                queue.push(children[i]);
            }
        }
    }
    return nodes;
};



// 二叉树的广度优先遍历算法(BFS)
// 来源： https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/
function BFS(root) {
    if (!root) return [];
    let res = [];
    let queue = [root];
    while (queue.length) {
        let curr = []; //装node.val ，最后到res里面
        let temp = []; //装node.left 和node.right 最后到queue里面
        while (queue.length) {
            let node = queue.shift();
            curr.push(node.val);
            if (node.left) temp.push(node.left);
            if (node.right) temp.push(node.right);
        }
        res.push(curr);
        queue = temp;
    }

    return res;
}


// 2.深度优先遍历 DFS （deep first search）
// let deepTraversal2 = (node) => {
//   let nodes = [];
//   if(node){
//     nodes.push(node);
//     let children = node.children;
//     for(let i=0;i< children.length; i++){
//       nodes = nodes.concat(deepTraversal2(children[i]));
//     }
//   }
//   return nodes;
// }

// let DFS2 = (node, result = []) => {
//    result.push(node);
//   if(node !== null){
//     let children = node.children;
//     for(let i=0; i<children.length; i++){
//       DFS2(children[i], result);
//     }
//   }
//   return result;
// }


// Leetcode 11: 容器盛水最多：
// 使用双指针法
// 根据面积计算规则，面积是由两个柱子的距离和柱子最低高度决定的。
//
// 所以，一开始前后指针指向第一根柱子和最后一根柱子，计算这两根柱子的面积，此时他们距离是最大的。
//
// 由于高度收到最低的限制，所以前后指针中高度最低的往中间移动，知道找到比它高的柱子（因为距离在减少，所以只有高度增大才有机会比之前的大），再重新计算面积，并和前面的比较，取最大值。
//
// 作者：thiinker
// 链接：https://leetcode-cn.com/problems/container-with-most-water/solution/jsshuang-zhi-zhen-fa-liang-ju-hua-shuo-ming-bai-yu/
//   来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
//
// let maxArea = function (heightarr){
//   let left = 0;
//   let right = heightarr.length - 1;
//   let max = 0;
//   let maxl =[], maxr= [];
//   while (left < right){
//     let area = (right -left) * Math.min(heightarr[right], heightarr[left]);
//     if(max<area){
//       max = area;
//       maxl.push( left);
//       maxr.push( right);
//     }
//
//     if(heightarr[left] < heightarr[right]){
//       ++left;
//     }else {
//       --right;
//     }
//   }
//   return [max, maxl, maxr];
// }
//
// console.log(maxArea([1,8,6,2,5,4,8,3,7]));

//Leetcode 93 复原IP地址
// 方法一 ： 回溯(DFS)
// 这是一个回溯函数backtrack(prev_pos = -1, dots = 3) 的算法，该函数使用上一个放置的点 prev_pos
// 和待放置点的数量 dots 两个参数 :
//
//   遍历三个有效位置curr_pos 以放置点。
//       检查从上一个点到现在点中间的部分是否有效 :
//           是 :
//               放置该点。
//               检查全部 3个点是否放好:
//                     是 :
//                         将结果添加到输出列表中。
//                     否 :
//                       继续放下一个点  // backtrack(curr_pos, dots - 1)。
//               回溯，移除最后一个点。
//
// 作者：LeetCode
// 链接：https://leetcode-cn.com/problems/restore-ip-addresses/solution/fu-yuan-ipdi-zhi-by-leetcode/
//   来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
let restoreIpAddresses = function (s) {
    let segments = [];
    let output = [];
    let n = s.length;

    function valid(segment) {
        if (segment.length > 3) {
            return false;
        }
        return (segment.charAt(0) !== '0') ? (Number(segment) <= 255) : (segment === '0');
    }

    function update_output(curr_pos) {
        let lastsegment = s.slice(curr_pos + 1, n);
        if (valid(lastsegment)) {
            output.push(segments.concat(lastsegment).join('.'));
        }
    }

    function backTrack(prev_pos, dots) {
        let max_pos = Math.min(prev_pos + 4, n - 1);
        for (let curr_pos = prev_pos + 1; curr_pos < max_pos; curr_pos++) {
            let segment = s.slice(prev_pos + 1, curr_pos + 1);
            if (valid(segment)) {
                segments.push(segment);
                if (dots - 1 === 0) {
                    update_output(curr_pos);
                } else {
                    backTrack(curr_pos, dots - 1);
                }
                segments.pop();
            }
        }
    }

    backTrack(-1, 3);
    return output;
}


//寻找两个数组的中位数。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
let findMedianSortedArrays = function (nums1, nums2) {

    function getKthElement(nums1, nums2, k) {
        let length1 = nums1.length, length2 = nums2.length;
        let index1 = 0, index2 = 0;
        let kthElement = 0;
        while (true) {
            // 边界情况
            if (index1 === length1) {
                return nums2[index2 + k - 1];
            }
            if (index2 === length2) {
                return nums1[index1 + k - 1];
            }
            if (k === 1) {
                return Math.min(nums1[index1], nums2[index2]);
            }

            // 正常情况
            let half = k / 2;
            let newIndex1 = Math.min(index1 + half, length1) - 1;
            let newIndex2 = Math.min(index2 + half, length2) - 1;
            let pivot1 = nums[newIndex1], pivot2 = nums2[newIndex2];
            if (pivot1 <= pivot2) {
                k -= (newIndex1 + 1 - index1);
                index1 = newIndex1 + 1;
            } else {
                k -= (newIndex2 + 1 - index2);
                index2 = newIndex2 + 1;
            }
        }
    }

    let length1 = nums1.length, length2 = nums2.length;
    let totalLength = length1 + length2;
    if (totalLength % 2 === 1) {
        let median = getKthElement(nums1, nums2, totalLength / 2 + 1);
        return median;
    } else {
        let median = (getKthElement(nums1, nums2, totalLength / 2) + getKthElement(nums1, nums2, totalLength / 2 + 1) / 2);
        return median;
    }
};


//Promise.retry    //https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/387
let retry = function (fn, times) {
    return new Promise(async function (resolve, reject) {
        while (times > 0) {
            try {
                let res = await fn()
                resolve(res)
                return;
            } catch (e) {
                if (!times) {
                    reject(e)
                }
                console.log('try again...')
                times--
            }
        }
        console.log('Error: No more times, now rejected.')
    })

};


//promisify     //usage: promisify(fs.readfile)(err, function (data, err){}).then().catch()
function promisify(fn) {
    return function () {
        let args = Array.from(arguments);
        return new Pormise(function (resolve, reject) {
            args.push(function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
            fn(...args);
            //   or  fn.apply(null, args);
        });
    }
}

Promise.prototype.finally = function(fn){
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(()=> value),
        reason => P.resolve(callback()).then(()=>{ throw reason })
    )
};

Promise.prototype.race = function(promises){
    return new Promise(function(resolve, reject){
        promises.forEach(item =>{
            Promise.resolve(item).then(resolve, reject);
        })
    })
};

Promise.prototype.all = function(promises){
    return new Promise(function(resolve, reject){
        let res = [];
        let n = promises.length;
        promises.forEach((p, index) =>{
            Promise.resolve(p).then(val=>{
                res[index] = val;
                if(res.length === n){
                    resolve(res);
                }
            }, err=>{
                reject(err);
            })
        })
    })
}

// promisify2(fn.readfile)('file.text', err, data).then().catch();

// function promisify2(fn){
//   return function (){
//     let args = Array.from(arguments);
//     return new Promise(function (resolve, reject){
//       args.push(function(err, data){
//         if(err){
//           reject(err);
//         }else{
//           resolve(data);
//         }
//       });
//       fn(...args);
//     })
//   }
// }


//获取url里的某个key=name的参数值
function getURLParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return r[2];
    } else {
        return null;
    }
}

// 获取所有参数保存到数组
function parse_url(_url) {
    var pattern = /(\w+)=(\w+)/ig;
    var parames = [];
    url.replace(pattern, function (match, b, c) {
        //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        parames.push([b, c]);
    });
    return parames;
}

// 字节一面：给定一个二叉树, 找到该树中两个指定节点间的最短距离
// 来源网址：https://github.com/sisterAn/JavaScript-Algorithms/issues/82
let minDist = function(root, p, q){
    //先找到p、 q的最小公共祖先
    function getParent (root, p, q){
        if(root === null || root === p || root ===q) return root;
        let left = getParent(root.left, p, q);
        let right = getParent(root.right, p, q);

        if(left === null) return right;
        if(right === null) return left;
        if(left && right) return root;
    }

    let parent = getParent(root, p, q);

    function getRoad(node, sum){
        if(node===null || res.length===2) return ; //node===null说明已经遍历到叶子节点，不用往下计算了; res.length的增加说明在下一步的判断中找到p或者q了，length=2说明两个都找到了，可以停止遍历了。

        if(node===p || node===q) {
            res.push(sum);
        }
        if(node.left !==null){
            getRoad(node.left, sum+1);
        }
        if(node.right !==null){
            getRoad(node.right, sum+1);
        }
    }
    getRoad(root, 0); //如果是求node.val的和，则，此处第二个参数可修改为node.val
    return res.reduce((pre, curr) => pre+curr);
};

export {
    restoreIpAddresses,
    retry,
    getURLParam,
    minDist,
}
