// https://zhuanlan.zhihu.com/p/639488285
/*

士兵过河问题
我们可以定义一个 dp 数组，dp[i]的含义是 0~i 兵全部过河所需的最短时间 假设每个士兵过河所需时间记录在 times 数组中，且 times 数组已经按用时升序.那么可得:

dp[0] = times[0] 对应A

dp[1] = times[1] 对应B

dp[i] 的取值有两种选择，如下:

dp[i] = dp[i-1] + times[0] + times[i]

dp[i] = dp[i-2] + times[0] + times[i] + times[1] + times[1]



dp[i] = dp[i-1] + times[0] + times[i] 的含义是:

抛开最快的 A，B 土兵，剩余较慢的士兵是奇数个，因此最后较慢士兵中会遗留 1 个在本岸

没有人组队，其余 0~i-1 土兵都已经过河(dp[i-1]代表 0 ~i-1 土兵全部过河)，因此我们需要

让对岸最快的士兵 A，即 0 号士兵送船回来，此时用时 tmes[0]，然后 0 号士兵和 i 号士兵

一起过河，此时用时 times[i]。

dp[i] = dp[i-2] + times[0] + times[i] + times[1] + times[1] 的含义是抛开最快的 A，B 土兵，剩余较慢的士兵是偶数个，因此最后较慢士兵会遗留 0 个士兵在本 岸，但是此时无法找到 dp 状态转移关系，因此我们后退一步，即当较慢土兵会遗留 2 个 士兵在本岸，即 0~i-2 的土兵已经全部过河 (dp[i-2]代表 0~i-2 的十兵已经全部过河)，因此我们需要让对岸最快的士兵 A，即 0 号兵送船回来，此时用时 times[0]，然后 i-1 号兵和 i 号兵划

船过河，用时 times[i]，然后对岸最快的 B 士兵，即 1 号士兵送船回来，用时 times[1]，然后

0 号士兵和 1 号士兵再开船到对岸，用时 times[1]。

为了 dp 状态转移方程的简单起见，这里我们不去求解:除了最快的 A,B 土兵，剩下较慢士兵个数是偶数个还是奇数个，而是直接让:dp[i] = Math.min(dp[i-1] + times[0] + times[i],dp[i-2] + times[0] + times[i] + times[1] + times[1] )即取两种情况的最少用时


*/
function getmin(t1, t2) {
    if(t1*10 < t2) {
        return t1*10;
    }else{
        return t2;
    }
}

function getMintimeOfCrossTheRiver(n, t, times){  // n: 士兵个数，t: 最大时间， times: 士兵过河时间
    times.sort((a, b) => a-b);
    let n = times.length

    let dp = new Array(n).fill(0)
    dp[0] = times[0];
    if(dp[0]>t) return "0, 0";

    dp[1] = getmin(times[0], times[1]);

    for(let i = 2; i < n; i++){
        dp[i] = Math.min(
            // 奇数个士兵
            dp[i-1] + times[0] + getmin( times[0], times[i]), 
            // 偶数个士兵
            dp[i-2] + times[0] + getmin(times[i-1], times[i]) + times[1] + getmin(times[0], times[1])
        )

        if(dp[i] > t){
            return `${i}, ${dp[i-1]}`; // 能运i个士兵到对岸，最短用时为dp[i-1]
        }
    }

    return `${n}, ${dp[n-1]}`
}
