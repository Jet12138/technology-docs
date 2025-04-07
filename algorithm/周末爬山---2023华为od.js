/*
作者：程序员基德
链接：https://www.nowcoder.com/discuss/697740966765092864
来源：牛客网

周末爬山

问题描述
K小姐准备在周末去爬山锻炼。山地图用二维数组表示，其中 0 代表平地，1 到 9 表示山的高度。K小姐每次爬山或下山时，高度差不能超过 
k。他每次只能向上、下、左、右四个方向之一移动一格。K小姐从左上角 
(0,0) 位置出发，请计算他能爬到的最高峰高度以及到达该高峰的最短步数。

输入格式
第一行输入三个整数 
m、n 和 k，以空格分隔。

接下来 m 行，每行包含 n 个整数（以空格分隔），表示 m×n 的二维山地图。

输出格式
输出两个整数，以空格分隔。第一个整数表示K小姐能爬到的最高峰高度，第二个整数表示到达该最高峰的最短步数。

如果存在多个相同高度的最高峰，输出步数较短的那个。

如果没有可以爬的更高的山峰，则高度和步数都输出 0。



解题思路如下：

从起点 (0,0) 开始，将其加入队列。
每次从队列中取出一个位置，检查它的四个相邻位置。
对于每个相邻位置，如果高度差不超过 k，且没有被访问过，就将其加入队列。
在这个过程中，记录到达的最大高度和对应的步数。
重复步骤 2-4，直到队列为空。

关键点：

使用一个二维数组 visited 来记录每个位置是否被访问过，避免重复访问。
使用一个队列来存储待访问的位置，保证按照距离起点的远近顺序访问。
每次访问新位置时，检查是否更新最大高度和步数。
时间复杂度分析：

在最坏情况下，需要访问地图上的每个位置一次，时间复杂度为 O(m×n)。
对于给定的数据范围（m,n≤500），这个复杂度是可以接受的。

*/ 

let mountains = [
    [0, 1, 2, 0],
    [1, 0, 0, 0],
    [1, 0, 1, 2],
    [1, 3, 1, 0],
    [0, 0, 0, 9]
]

let mounttains_2 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 9, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 9]
]


function climb_mountain(m, n , k, mountain) {
    //定义四个方向：上下左右
    let directions = [ [-1, 0], [1, 0], [0, -1], [0, 1]]

    // 初始化访问数组和队列
    visited = new Array(m).fill(0).map(() => new Array(n).fill(false))
    let queue = [[0, 0, 0]];    // [x, y, steps]
    visited[0][0] = true;

    let max_height = mountain[0][0];
    let min_steps = 0;

    while(queue.length>0){
        let [x, y, steps] = queue.shift();
        //检查是否需要来更新最大高度和最短步数
        if(mountain[x][y]>max_height || (mountain[x][y] == max_height && steps < min_steps)){
            max_height = mountain[x][y];
            min_steps = steps;
        }

        // 检查四个方向
        for( let [dx, dy] of directions){
            let nx = x + dx;
            let ny = y+dy;

            //检查新位置是否在地图范围内且未被访问过
            if(nx>=0 && nx<m && ny>=0 && ny<n && !visited[nx][ny]){
                //检查高度差是否不超过 k
                if(Math.abs(mountain[nx][ny] - mountain[x][y]) <= k){
                    queue.push([nx, ny, steps+1])
                    visited[nx][ny] = true;
                }
            }
        }
    }

    if(max_height > mountain[0][0]){
        return [max_height, min_steps]
    }else{
        return [0, 0];
    }
}

let [height, steps] = climb_mountain(5, 4, 1, mountains);

console.log("样例1", height, steps);

let [height_2, steps_2] = climb_mountain(5, 4, 1, mounttains_2);
console.log("样例2", height_2, steps_2);

