// 草稿文件 thedraft.js ：

// 1.归并排序
function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift())
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift())
    }

    return result;

}

function mergeSort(array) {
    let length = array.length;

    if (length < 2) {
        return array;
    }

    let middle = Math.floor(length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

//2. 快速排序
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i])
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));
}


function sortzijiexuzuixiao(strs) {
    let stack = [];
    let map = new Map();
    for(let el of strs) {
        map.set(el, (map.get(el) || 0)+1);
    }

    for(let el of strs){
        if(!stack.includes(el)){
            //如果el不在最终的结果栈里面，则，el还处在要进行比较的阶段
            while(stack.length>0 && stack[stack.length-1] > el && map.get(stack[stack.length-1])>0){
                //当该最终结果栈不为空， 且栈顶的元素字节序比当前的el大，所以，栈顶的元素可以弹出，
                // 然后是依次（while里继续下一轮比较）的比较栈顶和当前元素，如果大于当前元素，就依次弹出。
                // 当然了，如果栈顶元素的map.get()计数如果是0，说明后面就没有该元素了，按照题目的意思就不必弹出了
                stack.pop();
            }
            stack.push(el);
        }

        map.set(el, map.get(el)-1);  //当前遍历动作往下一轮之前，把计次减去1
    }
}