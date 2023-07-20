var distributeCandies = function(candies, num_people) {
    let temp =1;
    let ans = new Array(num_people).fill(0);
    let count = 0;
    for(let i = 0;i< num_people; ){
        ans[i]+=temp;
        count+=temp;
        console.log(i, ans[i]);
        if((count+temp+1)>candies){
            console.log(count);
            if(i===num_people){
                ans[0]+=(candies - count);
            }else{
                ans[i+1]+=(candies-count);
            }
            
            return ans;
        }
       
        temp++;

        
        i++;
        if(i=== num_people){
            i=0;
        }
    }
};

distributeCandies(80,4);