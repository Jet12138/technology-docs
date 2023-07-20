// 由于回溯法是暴力探索法，对于s1长度不太长（<=6，7，8）的情况可以用，太长了就超出leetcode网站时间限制了。
var checkInclusion = function(s1, s2) {
    if(s2.length<s1.length) return false;

    let window = new Map();
    let need = new Map();
    for(let str of s1){
        need.has(str) ? need.set(str, need.get(str)+1) : need.set(str, 1)
    }

    let left = 0, right = 0, valid = 0;
    while(right< s2.length){
        let c = s2[right];
        right++;
        if(need.has(c)){
            window.has(c)?window.set(c, window.get(c)+1):window.set(c, 1)
            if(window.get(c) === need.get(c)){
                valid++;
            }
        }

        while(valid===need.size){
            if(right-left === s1.length){
                return true;
            }
            let d = s2[left];
            left++;
            if(need.has(d)){
                if(window.get(d)===need.get(d)){
                    valid--;
                }
                window.set(d, window.get(d)-1);
            }
        }
    }
    return false;
};

console.log(checkInclusion("abadxeeee", "xdabaeeee"));