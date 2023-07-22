function duplicate(list){
    if(list.length===0){
        return ;
    }

    const map = new Map();
    let res = [];
    
    for(let i = 0; i<list.length; i++){
        if(typeof list[i] === 'number' || typeof list[i]=== 'string'){
            if(!map.has(list[i])){
                map.set(list[i], list[i]);
                res.push(list[i]);
            }
            
        }else {
            if(!map.has(JSON.stringify(list[i]))){
                map.set(JSON.stringify(list[i]), list[i]);
                res.push(list[i]);
            }
        }
    }

    return res;
}

let arr = [123,"meili", "123", "mogu", 123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"];

console.log(duplicate(arr));  //[123, 'meili', '123', 'mogu', [1, 2, 3],  [1, '2', 3]]

// 已完成