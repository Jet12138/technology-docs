//1.
function convert(array) {
    let reslutArray = array.filter((item) => {
        let children = array.filter((child) => {
            return item.id === child.parentId
        });
        item.children = children;
        return item.parentId === 0
    });
    return reslutArray
}

//2.基于DFS来写
function convert2(source, parentId = 0) {
    let trees = [];
    for (let item of source) {
        if (item.parentId === parentId) {
            let children = convert2(source, item['id']);
            if (children.length) {
                item.children = children
            }
            trees.push(item);
        }
    }
    return trees;
}

//3. 递归
function convert3(array, parentId = 0) {
    let result = [];
    array.forEach((item, index) => {
        if (item.parentId === parentId) {
            let children = convert3(array, item.id);
            if (children.length > 0) {
                item.children = children;
            }
            result.push(item);
        }
    });
    return result;
}


// 4.
function convert4(list) {
    for (let i = 0; i < list.length; i++) {
        let current = list[i];
        if (current.parentId !== 0) {
            let parent = list.find(item => item.id === current.parentId);
            parent.children = parent.children || [];
            parent.children.push(current)
        }
    }
    return list.filter(item => item.parentId === 0)
}


let list = [
    {id: 1, name: '部门A', parentId: 0},
    {id: 2, name: '部门B', parentId: 0},
    {id: 3, name: '部门C', parentId: 1},
    {id: 4, name: '部门D', parentId: 1},
    {id: 5, name: '部门E', parentId: 2},
    {id: 6, name: '部门F', parentId: 3},
    {id: 7, name: '部门G', parentId: 2},
    {id: 8, name: '部门H', parentId: 4}
];

let res = convert(list)
console.log(res)


export {
    convert,
    convert2,
    convert3,
    convert4,
}
