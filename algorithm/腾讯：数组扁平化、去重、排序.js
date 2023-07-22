function fn(arr){
    return Array.from(new Set(arr.flat(Infinity))).sort((a,b) => a-b);
}

console.log(fn([1,2,[5,4, 4], 0]));