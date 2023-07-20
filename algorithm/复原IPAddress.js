var restoreIpAddresses = function(s) {
    let segments = [];
    let output = [];
    let n = s.length;

    function valid(segment){
        if(segment.length>3){
            return false;
        }
        return (segment.charAt(0) !=='0' ) ? (Number(segment)<=255) : (segment === '0');
    }

    function update_output(curr_pos){
        let lastsegment = s.slice(curr_pos+1, n);
        if(valid(lastsegment)){
            //校验通过，这种可能的结果即将被push到output数组中；
            // 在这里省去下面的 segments.push 和下面的 segments.pop 而直接用segments.concat(lastsegment).join('.')
            // segments.push(lastsegment);
            output.push(segments.concat(lastsegment).join('.'));  //向output数组新插入了一条合格的IP
            // segments.pop(); // 敲除最后一段，也就是回溯，相当于break，这次循环的结果已经得出，我们要跳出去这次循环去继续遍历新的可能啦。
        }
    }

    function backTrack(prev_pos, dots){
        let max_pos = Math.min(prev_pos+3, n-1);
        for(let curr_pos = prev_pos; curr_pos < max_pos; curr_pos++){
            let segment = s.slice(prev_pos, curr_pos+1);
            if(valid(segment)){
                segments.push(segment);
                if(dots - 1 === 0){
                    update_output(curr_pos);   
                    //IP字符串中的点放完了，可以去检查末尾这一段s.slice（curr_pos, n），看能否得到输出结果。
                }else {
                    backTrack(curr_pos+1, dots-1);   //继续判断下一段segment
                }
                segments.pop();   //回溯；接下来咱们就一起跳出这次循环，去进入下一次循环来找寻其他的可能啦！
            }
        }
    }

    backTrack(0,3);   //dot的初始位置：prev_pos，它的值肯定是-1； 3是即将放置的点的数量，IP地址里只有3个点； s是题目中要进行求解的字符串
    return output;
};

console.log(restoreIpAddresses('101023')); // 完成
