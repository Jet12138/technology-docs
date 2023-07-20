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
