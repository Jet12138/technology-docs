var trap = function(height) {
    let ans = 0;
    let stack = [];
    for(let i =0; i< height.length; i++){
        while(stack.length>0 &&(height[stack[0]] < height[i])){
            // stack.length>0保证了形成坑时，坑是有底部的;height[stack[0]]<height[i],保证了坑底部是小于坑的右边的，此时可以出栈。
            // 只要满足上面 while 的判断条件就可以不停地栈头出栈去形成坑底，去不停地计算雨水面积。
            // 计算时：横着一层层往上，累加。
            let curr = stack[0];
            stack.shift(); //栈头出去，做坑的底部
            if(stack.length===0){
                // stack.length=0说明了形成坑时，坑没有有左边了，此时停止计算;
                break;
            }
            

            let left = stack[0];
            let right = i;
            let h = Math.min(height[right], height[left])-height[curr];
            ans += (right-left-1)*h;
        }

        // 上面的while循环进行完毕，没有可以形成坑底和坑左边的东西了。
        // 故，刚刚上面while 判断条件中的坑的右边入栈，未来会形成新坑的左边或坑的底部。
        stack.unshift(i);  
    }

    console.log(stack);
    return ans;
};

trap([1,2,3,4,0,1,2,3,4]);