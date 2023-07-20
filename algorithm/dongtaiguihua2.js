function package012(thingscount, bagv, arrv, arrp){
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
        dp[i][j] = Math.max(Number(dp[i-1][j]), Number(dp[i-1][j-arrv[i]]) + arrp[i]);
      }else {
        dp[i][j] = Number(dp[i-1][j]);
      }
    }
  }

  console.log(dp);
  return  dp[thingscount][bagv];
}


// 拍平函数；数组扁平化；
function flatten(arr, result = []){
  for(let item of arr) {
    if(Array.isArray(item)){
      flatten(item, result);
    }else {
      result.push(item);
    }
  }
  return result;
}

export {
  package012,
  flatten,
}
