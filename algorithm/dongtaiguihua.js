

function package01(thingscount, bagv, arrv, arrp){
  function getcolumn(){
    let column = [];
    for(let i =0; i<bagv+1; i++){
      column.push(0);
    }
    return column;
  }
  let dp =[];
  for(let i = 0; i< thingscount+1; i++){
    dp.push(getcolumn());
  }

  //上面是初始化dp数组，全都置为0； 且：第一行和第一列为0， 为边界条件。
  for(let i = 1; i < thingscount+1; i++ ){  //遍历每行，
    for(let j = 1; j< bagv+1; j++){          //遍历每行中的每列
      if(j>=arrv[i]){
        dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-arrv[i]] + arrp[i]);
      }else {
        dp[i][j] = dp[i-1][j];
      }
    }
  }


  //item表示，物品是否存放的数组，按i的顺序排列，第[0]项无意义。
  let item = [0];
  function findindex( i, j ){
    if(i-1>=0){  //  防止越过边界。i-1最后=0 表示到了选择0件物品的时候，即最初的边界。
      if( dp[i][j] === dp[i-1][j] ){
        item[i] = 0;
        return findindex( i-1, j );
      }else  if( j-arrv[i]>=0 && dp[i][j] === (dp[i-1][j-arrv[i]]+arrp[i]) ) {
        item[i]=1;//标记已被选中
        return findindex( i-1, j-arrv[i] );//回到装东西之前状态的位置
      }
    }
  }
  findindex(thingscount, bagv );

  item.shift();  //除去初始化时（ let item = [0];）塞进去的0；
  return {
    maxvalue: dp[thingscount][bagv],
    wasthingsloaded: item,
  };
}

// 测试用例：
// n=5;    //物品个数n
// c=10;   //背包容量c
// 	int w[6]={0,2,2,6,5,4};   //物品体积数组 w ,0无意义，只是为方便描述问题而已
// int p[6]={0,6,3,5,4,6};    //物价值 p ,0无意义，只是为方便描述问题而已
// package01(5, 10, [2,2,6,5,4], [6,3,5,4,6]);   //输出： 15



function devpackage01(thingscount, bagv, arrv, arrp){
  // ***********优化二维数组空间为一维数组后的动态规划 start*************
  /*
  * 说明： 用一维数组来盛放每次的结果dp[j],
  * thingscount 是物品个数
  * thingscount 是背包容量
  * arrv 是物品体积数组
  * arrp 是物品价值数组， arrv 和 arrp  每个位置上的数值是对应到一个物品上。
  * */
  let dp = new Array(bagv+1).fill(0);
  for(let i =1; i< thingscount+1; i++){
    for(let j = bagv+1; j >=0; j--){
      if(j>=arrv[i]){
        dp[j] = Math.max(dp[j], dp[j-arrv[i]]+ arrp[i]);
      }else {
        dp[j] = dp[j];
      }
    }
  }
  // console.log(dp);
  return dp[bagv];
  // 然而不足的是，虽然优化了动态规划的空间，但是该方法不能找到最优解的解组成，因为动态规划寻早解组成一定得在确定了最优解的前提下再往回找解的构成，而优化后的动态规划只用了一维数组，之前的数据已经被覆盖掉，所以没办法寻找，所以两种方法各有其优点。
  // ************* 优化二维数组空间后的动态规划 end*************
}

export{
  package01,
  devpackage01,
}


/*
*
*动态规划： 最短路径； 01背包问题； 八皇后问题；
*
* 背包问题：构建二维数组 dp = [
*  [ dp[i1][j1], dp[i1][j2], ... , dp[i1][jn] ],
*  [ dp[i2][j1], dp[i2][j2], ... , dp[i2][jn] ],
*  ....,
*  [ dp[im][j1], dp[im][j2], ... , dp[im][jn]],
* ]
*
*   i1表示第一行， jn表示第n列
* dp数组里的每一个[ix, jy] 可以表示成 dp[x][y] ;
* 第一层数组总有m 个（第 m 行），表示背包问题候选的 m 个的物品;
* 第二层数组总有 n 个(第 n 列)， 表示背包可放容量；
* dp[x][y]表示从物品中选出前面 x 件，背包可放容量为 y 时的结果，本题中就是物品的最大价值。
*
* */



/*
 if(y>=w[x]){   //y 代表的背包可放容量（或者说包可放容量逐步增加，看能不能放得下更多的物品），w[x]表示该物品的体积, p[x]表示物品x的价值
					 * 当能放得下这个物品时，放下这个物品，对dp[x][y]这个状态来说，空间减小，但是价值增加，最大价值是dp[x-1][y-w[x]] + p[x]。
					 * 当能放得下这个物品时，不放这个物品时，空间还是那么大，物品还是到x-1，最大价值还是dp[x-1][y]
					 * 比较这两个大小，取最大的，就是dp[x][y]的值， 同时也决定了放不放下这个物品。


*********不管该子问题以后是否被用到，只要它被计算过，就将其结果填入表中。这就是动态规划法的基本思路。(二维数组要填满)********
原文链接：https://blog.csdn.net/zw6161080123/java/article/details/80639932
*/



/*
* n
* arrv[] : 各个物品的体积， 数组
* arrp[]: 各个物品的价值， 数组
* 数组中每个位置（i，j）的数字 dp[i][j] 就表示当组成元素只有W1，W2……Wi，背包可放容量为j时的结果，本题中就是物品们的最大价值。
* */

