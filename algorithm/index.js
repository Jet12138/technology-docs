/*
* 以下算法的实验时间为2020-4-2
* 测试的浏览器版本：80.0.3987.149（正式版本） （64 位）
* */
//1. 冒泡排序
//平均时间复杂度O(n^2)  空间复杂度O(1)  稳定性： 稳定
//传统冒泡排序耗时: 0.02392578125ms  较小
//传统冒泡排序耗时: 0.12517578125ms 最大
function maopao(array) {
    console.time("传统冒泡排序耗时");
    let length = array.length;
    let temp;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
            }
        }
    }
    console.timeEnd("传统冒泡排序耗时");
    return array;
}

//1-2. 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。
//改进后冒泡排序耗时: 0.02490234375ms   较小
//改进后冒泡排序耗时: 0.065908203125ms  最大

function gaijinmaopao(array) {
    console.time("改进后冒泡排序耗时");
    let low = 0;
    let high = array.length - 1;
    let tmp, j;
    while (low < high) {
        // 正排找最大
        for (j = low; j < high; j++) {
            if (array[j] > array[j + 1]) {
                //正向冒泡，找到最大者
                tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            } // 第一次遍历结束，找到最大者，放到末尾，故下面可以high--；
        }
        high--;

        // 反排找最小
        for (j = high; j > low; j--) {
            if (array[j] < array[j - 1]) {
                //反向冒泡，找到最小者
                tmp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = tmp;
            } // 第一次遍历结束，找到最大者，放到前面，故下面可以low++；
        }
        low++;
    }
    console.timeEnd("改进后冒泡排序耗时");
    return array;
}

//2. 选择排序：
//平均时间复杂度O(n^2)  空间复杂度O(1)  稳定性： 不稳定
// 选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。 n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果
//选择排序耗时: 0.022216796875ms   较小
//选择排序耗时: 0.048095703125ms  最大
//PS: 表现最稳定的排序算法之一，因为无论什么数据进去都是O(n2)的时间复杂度，所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。理论上讲，选择排序可能也是平时排序一般人想到的最多的排序方法了吧。

function selectionSort(array) {
    console.time("选择排序耗时");
    let length = array.length;
    let minIndex, temp;
    for (let i = 0; i < length - 1; i++) {
        //初始时，有序区长度为0，即为空，无序区长度为length，即无序区是数组全部；
        minIndex = i;
        for (let j = i + 1; j < length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
                //每次遍历都找到最小值的index；
            }
        }
        //找到无序区min成员的index后,将这个min成员和此时有序区的末尾后的那一位成员进行交换，即：，将找到的将无序区段的最小值交换到有序区的末尾后的一位（也就是此时i的位置，也是此时无序区的第一位），然后有序长度加一，无序区长度减一；
        temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    console.timeEnd("选择排序耗时");
    return array;
}

//3. 插入排序
//平均时间复杂度O(n^2)  空间复杂度O(1)  稳定性： 稳定
// 插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。
// 排序耗时: 0.01708984375ms
function insertionSort(array) {
    console.time("插入排序耗时");
    let length = array.length;
    let current, preIndex;
    for (let i = 1; i < length; i++) {
        current = array[i];
        preIndex = i - 1;

        //**** for 循环写插入排序
        for (let j = preIndex; ;) {
            //已排元素的最后index递减遍历，当遍历到的array[遍历的index]> current那么这个成员的值复制到后一位。另外地，如果array[遍历的index]<= current,则把current的值附着给已排元素的尾巴,开始时已排序元素默认只有array[0]。。。。。。这里的for循环的写法确实不如while写法好看简洁。
            if (j >= 0 && array[j] > current) {
                array[j + 1] = array[j];
            } else {
                array[j + 1] = current;
                break;
            }
            j--;
        }

        //**** while 循环写插入排序
        // while ( preIndex>=0 && array[preIndex]> current) {
        //   array[preIndex+1] = array[preIndex];
        //   preIndex--;
        // }
        // array[preIndex+1] = current;


    }
    console.timeEnd("插入排序耗时");
    return array;
}


//4. 希尔排序--已完成
function shellSort(arr){
    let n = arr.length;
    for( let gap = Math.floor(n/2); gap>=1; gap=Math.floor(gap/2)){
        for(let i=gap; i<n; i++){
            let current = arr[i];
            let j = i;
            while(j-gap>=0 && arr[j-gap]>current){
                arr[j]=arr[j-gap];
                j=j-gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}

// console.log(shellSort([5,4,3,2,1,6,4,8,0,3]));  // [0, 1, 2, 3, 3, 4, 4, 5, 6, 8]

//5. 归并排序： 分治法，递归
//平均时间复杂度O(n*log2 n)  空间复杂度O(n)  稳定性： 稳定
// 和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(n log n）的时间复杂度。代价是需要额外的内存空间。
// 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。
//  算法描述:
// 把长度为n的输入序列分成两个长度为n/2的子序列；
// 对这两个子序列分别采用归并排序；
// 将两个排序好的子序列合并成一个最终的排序序列。

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
}

function mergeSort(array) {
    //采用自上而下的递归方法
    let length = array.length;
    if (length < 2) {
        return array;
    }
    let middle = Math.floor(length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

//6. 快速排序：分治法，递归
//平均时间复杂度O(n*log2 n)  空间复杂度O(n*log2 n)  稳定性： 不稳定, 排序方式： in-place(占用常数内存，不占用额外内存)
// 快速排序的名字起的是简单粗暴，因为一听到这个名字你就知道它存在的意义，就是快，而且效率高! 它是处理大数据最快的排序算法之一了。
// 快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：
//
// 从数列中挑出一个元素，称为 “基准”（pivot）；
// 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
function quickSort(array) {
    // console.time("快速排序耗时");
    if (array.length <= 1) {
        return array;
    }
    //pivot 中心，核心，中心点，支点
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    // console.timeEnd("快速排序耗时");
    return quickSort(left).concat([pivot], quickSort(right))
}

//7.堆排序
// 堆排序可以说是一种利用堆的概念来排序的选择排序。
// 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
// 具体算法描述如下：
// <1>.将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区；
// <2>.将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足R[1,2...n-1]<=R[n]；
// <3>.由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，然后 再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元 素个数为n-1，则整个排序过程完成。
function heapSort(array) {
    console.time("堆排序耗时");

    let heapSize = array.length;
    let temp;

    //堆的排序进行调整，使它还成为一个大根堆。
    function heapify(array, i, length) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let largest = i;
        let temp;
        if (left < length && array[left] > array[largest]) {
            largest = left;
        }
        if (right < length && array[right] > array[largest]) {
            largest = right;
        }
        if (largest !== i) {
            temp = array[i];
            array[i] = array[largest];
            array[largest] = temp;
            heapify(array, largest, length);
        }
    }

    //建立大根堆。
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(array, i, heapSize);
    }
    //堆排序
    for (let i = heapSize - 1; i >= 1; i--) {
        temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        heapify(array, 0, --heapSize);
    }
    console.timeEnd("堆排序耗时");
    return array;
}

//8. 计数排序
function countingSort(arr) {
    let max = arr[0];
    let arrLen = arr.length;
    let sortedIndex = 0;

    for (let i = 0; i < arrLen; i++) {
        max = max >= arr[i] ? max : arr[i];
    }

    let bucket = new Array(max + 1);
    let bucketLen = max + 1;

    for (let i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            //初始，bucket=[, , , , , ..., ] length = max+1   所以bucket[arr[i]] = undefined, 要初始化为0；
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (let j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {

            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}

function leijia(result, initnum, final) {
    //递归累加
    if (initnum > final) {
        return result;
    }
    return leijia(result + initnum, initnum + 1, final);
}

function deepCopy(p, c) {
//  深拷贝
    let cc = c || {};
    for (let i of Object.keys(p)) {
        if (typeof p[i] === 'object') {
            cc[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], cc[i]);
        } else {
            cc[i] = p[i];
        }
    }
    return cc;
}

//森林中的兔子: 要想使得兔子数量最小，那么尽量将报同样数量的视为同一颜色，但为了不矛盾，需要使用map记录对应颜色兔子最大的出现次数
// 报0的兔子一定是独一无二的直接++
function countRabbit(answers) {
    let map = new Map(), res = 0;

    for (let a of answers) {
        if (a === 0) {
            res++;
        } else if (!map.has(a)) {
            res += (1 + a);
            map.set(a, a);
        } else {
            map.set(a, map.get(a) - 1);
            if (map.get(a) === 0) {
                map.delete(a);
            }
        }
    }
    return res;
}

//森林里的兔子，计数算法，使用方法举例：
// let num = countRabbit([10, 10, 10]);
// console.log(num);



//leetcode第125题： 验证回文串
// 题目描述:
// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
//
// **说明：**本题中，我们将空字符串定义为有效的回文串。
//
// 示例 1:
//
// 输入: "A man, a plan, a canal: Panama"
// 输出: true
// 示例 2:
//
// 输入: "race a car"
// 输出: false

//解题思路： 一开始先建立两个指针，left 和 right , 让它们分别从字符的开头和结尾处开始遍历整个字符串。
//
// 如果遇到非字母数字的字符就跳过，继续往下找，直到找到下一个字母数字或者结束遍历，如果遇到大写字母，就将其转为小写。
//
// 当左右指针都找到字母数字时，可以进行比较的时候，比较这两个字符，如果相等，则两个指针向它们的前进方向挪动，然后继续比较下面两个分别找到的字母数字，若不相等，直接返回 false。
function ishuiwenstr(str) {
    if (str.length === 0) {
        return true;
    }

    let l = 0, r = str.length - 1;
    while (l < r) {
        if (!/[a-zA-Z0-9 ]/.test(str.charAt(l))) {
            l++;
        } else if (!/[a-zA-Z0-9 ]/.test(str.charAt(r))) {
            r--;
        } else {
            if (str.charAt(l).toLowerCase() !== str.charAt(r).toLowerCase()) {
                // console.log(str.charAt(l), str.charAt(r));
                return false;
            }
            l++;
            r--;
        }
    }
    return true;
}


//leetcode 870: 优势洗牌： 解题思路
// 大家都听过田忌赛马的故事了吧。
// 上等马->中等马
// 中等马->下等马
// 下等马->上等马
// 这样可以获得最多的胜利次数。
// 这里的题目也一样，如何获得最多的A[i]>B[i]次数呢？
//
// 我们需要每次找一个比B[i]大的数，但是最接近B[i]的数，相当于A的上等马->B的中等马
// 如果找不到，那么我们就给B[i]一个最小的数，相当于A的下等马->B的上等马
//
// 作者：lee-lei
// 链接：https://leetcode-cn.com/problems/advantage-shuffle/solution/jstan-xin-si-xiang-by-lee-lei/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
function youshixipai(arr1, arr2) {
    arr1.sort((a, b) => a - b);
    let res = [];
    for (let i = 0; i < arr2.length; i++) {
        let isOK = false;
        for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] > arr2[i]) {
                isOK = true;
                res.push(arr1.splice(j, 1)[0]);
                break;
            }
        }
        if (!isOK) {
            res.push(arr1.splice(0, 1)[0]);
        }
    }
    return res;
}

//leetcode 135： 分发糖果： 从左到右遍历完后，我们同样地从右到左遍历。
function candy(ratings) {
    let candies = new Array(ratings.length);
    candies.fill(1);  //先初始都给发一个糖果
    //从前往后
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    let sum = candies[ratings.length - 1];
    //  从后往前
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
        sum += candies[i];
    }
    return sum;
}

//leetcode 1014（中等）：最佳观光组合
// 作者：fanzhanxiang
// 链接：https://leetcode-cn.com/problems/best-sightseeing-pair/solution/zui-jia-guan-guang-zu-he-by-fanzhanxiang/
//   来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

function maxScoreSightseeingPair(A) {
    let score = 0, mx = A[0] + 0;
    for (let j = 1; j < A.length; j++) {
        score = Math.max(score, mx + A[j] - j);
        mx = Math.max(mx, A[j] + j);
    }
    return score;
}

//45. 跳跃游戏 II  (困难)  思路每一部都贪心，选择最大步数
// 题目描述：给定一个非负整数数组，你最初位于数组的第一个位置。
//
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
//
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。

// 说明:
//
//   假设你总是可以到达数组的最后一个位置。
//
// 思路
// 贪婪策略，即我们每次在可跳范围内选择可以使得跳的更远的位置，由于题目保证了你总是可以到达数组的最后一个位置,因此这种算法是完备的。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/jump-game-ii
//   著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function jump2(nums) {
    let length = nums.length;
    let end = 0;
    let maxPosition = 0;
    let steps = 0;
    for (let i = 0; i < length - 1; i++) {
        maxPosition = Math.max(maxPosition, i + nums[i]);  //每一跳都尽力跳最远，
        if (i === end) {
            end = maxPosition;  //当跳到最大值那个i就重新跳(更改计数判断的下一次起始点，其实这说法不好理解，就是把下个目标位置右移到最大限)，
            steps++;    //这时step+1
        }
    }
    return steps;
}

// Array.prototype.concat()：  concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
// console.log('flatten: ',flatten([1,2 ,
//   [3, 4, [5] ],
//   [6, 7, [8, [9]]]
// ]));        //  [1, 2, 3, 4, 5, 6, 7, 8, 9]
function flatten(arrs) {
    let res = [];
    for (let elem of arrs) {
        if (Array.isArray(elem)) {
            res = res.concat(flatten(elem));
        } else {
            res = res.concat(elem);
        }
    }
    return res;
}

//leetcode 93. 复原IP地址: 回溯法
// restoreIpAddresses("25525511135")   // [255, 255, 11, 135] , [255, 255, 111, 35]
function restoreIpAddresses(s) {
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
            //校验通过，这种可能的结果即将被push到output数组中；
            //segments.push(lastsegment);
            output.push(segments.concat(lastsegment).join('.'));   //向output数组新插入了一条合格的IP
            //segments.pop(); // 敲除最后一段，也就是回溯，相当于break，这次循环的结果已经得出，我们要跳出去这次循环去继续遍历新的可能啦。
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
                    //IP字符串中的点放完了，可以去检查末尾这一段s.slice（curr_pos, n），看能否得到输出结果。
                } else {
                    backTrack(curr_pos, dots - 1);   //继续判断下一段segment
                }
                segments.pop();   //回溯；接下来咱们就一起跳出这次循环，去进入下一次循环来找寻其他的可能啦！
            }
        }
    }

    backTrack(-1, 3);   //dot的初始位置：prev_pos，它的值肯定是-1； 3是即将放置的点的数量，IP地址里只有3个点； s是题目中要进行求解的字符串
    return output;
};


function promisify(fn) {
    return function () {
        let args = Array.from(arguments);
        return new Promise(function (resolve, reject) {
            args.push(function (error, data) {
                if (error) {
                    return reject(error);
                }
                resolve(data);
            });
            fn(...args);
        });
    }
}


export {
    maopao,
    gaijinmaopao,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort,
    countingSort,
    leijia,
    deepCopy,
    countRabbit,
    ishuiwenstr,
    youshixipai,
    maxScoreSightseeingPair,
    candy,
    jump2,
    flatten,
    promisify,
    restoreIpAddresses,
}
