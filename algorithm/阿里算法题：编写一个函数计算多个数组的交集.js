function fn(...arrs){
    return Array.from(new Set(arrs.reduce((prev, val)=>{
        return prev.filter(elem => val.includes(elem));
    })));
}

console.log(fn([1,2,3,3,4], [3,3,4], [4,4,3,3,6]));