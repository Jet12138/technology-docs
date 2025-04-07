// 草稿文件 thedraft.js ：

// 1.归并排序
function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift())
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift())
    }

    return result;

}

function mergeSort(array) {
    let length = array.length;

    if (length < 2) {
        return array;
    }

    let middle = Math.floor(length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

//2. 快速排序
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i])
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));
}


function sortzijiexuzuixiao(strs) {
    let stack = [];
    let map = new Map();
    for(let el of strs) {
        map.set(el, (map.get(el) || 0)+1);
    }

    for(let el of strs){
        if(!stack.includes(el)){
            //如果el不在最终的结果栈里面，则，el还处在要进行比较的阶段
            while(stack.length>0 && stack[stack.length-1] > el && map.get(stack[stack.length-1])>0){
                //当该最终结果栈不为空， 且栈顶的元素字节序比当前的el大，所以，栈顶的元素可以弹出，
                // 然后是依次（while里继续下一轮比较）的比较栈顶和当前元素，如果大于当前元素，就依次弹出。
                // 当然了，如果栈顶元素的map.get()计数如果是0，说明后面就没有该元素了，按照题目的意思就不必弹出了
                stack.pop();
            }
            stack.push(el);
        }

        map.set(el, map.get(el)-1);  //当前遍历动作往下一轮之前，把计次减去1
    }
}

// z接雨水
let trap = function (height) {
    let stack = [];
    let res = 0;
    for(let i = 0; i<height.length; i++){
        while(stack.length>0 && height[stack[stack.length-1]] < height[i]){
            //stack末尾这个可以拿出来做坑底了。
            let bottom = stack.pop();
            if(stack.length===0){
                break;
            }
            let h = Math.max(height[stack[stack.length-1]], height[i])-height[bottom];
            res = res+ h*(i-stack[stack.length-1]-1)

        }

        stack.push(i);
    }
}

// 找二叉搜索树的第K个小的数
var kthSmallest = function (root, k) {
    let res = null;
    function dfs(node){
        if(node === null){
            return;
        }

        dfs(node.left);
        if(--k ===0) {
            res = node.val;
        }
        dfs(node.right);
    }
    dfs(root);

    return res;
}




/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}

 二叉搜索树，又叫二叉查找树，二叉排序树。性质是：左子树都比根小，右子树都比根大，且左右子树又分别是二叉搜索树。

 即：二叉搜索树上的每个节点都需要满足：
        左子节点值小于该节点值；
        右子节点值大于该节点值；

我们知道：二叉树的中序遍历其实是对\U0001f332进行排序操作 ，并且二叉搜索树的中序遍历是按从小到大的顺序排序，所以本题就很简单了

解题思路： 中序遍历二叉搜索树，输出第 k 个既可
 */
var kthSmallest = function(root, k) {
    let res=null;
    const inOrder = (node) => {
        if(node!==null  ){
            //中序遍历顺序是 左根右
            inOrder(node.left);
            if(--k ===0){
                res = node.val;
                return;
            }
            inOrder(node.right);
        }
    }
    inOrder(root);
    return res;
};


let reverseKgroup = function(head, k){
    if(head === null) reutrn head;
    //  如果链表长度不足k就保持原来顺序

    let fast = head;
    let i = k;
    while(i--){
        if(fast){
            fast = fast.next;
        }else{
            return head;
        }
    }

    let j = k;
    let prev = null;
    let curr = head;
    let next;
    while(j--){
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    head.next = reverseKgroup(curr, k);
    return prev;
}

let searchRange = function(nums, target) {
    let leftFind = -1;
    let rightFind = -1;
    let left = 0;
    let right = nums.length-1;

    while(left<=right){
        if(nums[left]<target){
            left++;
        }
        if(leftFind===-1 && nums[left]===target){
            leftFind = left;
            left++;
        }

        if(nums[right]>target){
            right--;
        }
        if(rightFind===-1 &&nums[right]===target){
            rightFind = right;
            right--;
        }

        if(leftFind!== -1 && rightFind !==-1){
            break;
        }
    }

    return [leftFind, rightFind];
}


let findOrder = function (numCourses, prerequisites) {
    let edges = new Array(numCourses).fill(0).map(() => new Array(numCourses));
    let visited = new Array(numCourses).fill(0);
    let valid = true;
    let res = [];
    for(let [u, v] of prerequisites){
        edges[v].push(u);
    }

    function dfs(u){
        visited[u] = 1;
        for(let v of edges[u]){
            if(visited[v] === 0){
                dfs(v);
                if(!valid){
                    return;
                }
            }else if(visited[u] === 1) {
                valid = false;
                return;
            }
        }

        visited[u] = 2;
        res.unshift(u);
    }

    for(let i = 0; i < numCourses && valid; i++){
        if(visited[i] === 0){
            dfs(i);
        }
    }

    if(!valid) return [];

    return res;
}

function validTriangle(nums) {
    if(nums === null || nums.length<2) return 0;]
    let count = 0;
    nums.sort((a, b) => a-b);
    let n = nums.length;
    for(let i=n-1; i>=2; i--){
        let left = 0;
        let right = i-1;

        while(left<right) {
            if(nums[left] + nums[right] > nums[i]){
                count+=(right-left);
                right--;
            }else{
                left++;
            }
        }
    }

    return count;
}

function findTarget(root, k) {
    let set = new Set();

    function dfs(root, k){
        if(root===null) return false;
        if(set.has(k-node.val)) return true;

        set.add(node.val);

        return dfs(node.left, k) || dfs(node.right, k);
    }

    return dfs(root, k);
}

let multiply = function (num1, num2) {
    if(num1==='0' || num2==='0') return '0';
    let m = num1.length;
    let n = num2.length;
    let res = new Array(m+n).fill(0);

    for(let i = m-1; i>=0; i--){
        let n1 = num1[i]-'0';
        for(let j = n-1; j>=0; j--){
            let n2 = num2[j]-'0';

            let mul = res[i+j+1] +n1 * n2;
            res[i+j+1] = mul%10;
            res[i+j] = Math.floor(mul/10);

        }
    }

    return res.join('').replace(/^0*/, '');
}

let isPalindrome = function (s) {
    if(s.length === 0) return true;
    let left =0;
    let right = s.length-1;
    while(left<right){
        if(/A-Za-z0-9/.test(s[left]) === false){
            left++;
        }else if(/A-Za-z0-9/.test(s[right]) === false) {
            right--;
        }else{
            if(s[left].toLocalLowerCase() !== s[right].toLocalLowerCase()){
                return false;
            }
            left++;
            right--;
        } 
    }
    return true;
}

let countSubstrings = function(s) {
    let res = 0;

    function helper(s, left, right) {
        while(left>=0 && right<s.length && s[left]===s[right]){
            res++;

            left--; 
            right++;
        }
    }

    for(let i = 0; i < s.length; i++) {
        helper(s, i, i);
        helper(s, i, i+1);
    }

    return res;
}

let maxSubArray = function(nums) {
    let max = -Infinity;
    let pre = 0;
    for(let i = 0; i < nums.length; i++) {
        if(pre > 0) {
            pre += nums[i];   //只要这个连续相加的和还大于0， 即使数在递减，也可以在当前遍历时尝试往后加数，
        }else{
            pre = nums[i];
        }

        max = Math.max(max, pre);
    }

    return max;
}

// 防抖函数 https://github.com/sisterAn/JavaScript-Algorithms/issues/95
function debounce(fn, wait = 50){
    let timer = null
    return function(...args) {
        let context = this;

        if(timer) clearTimeout(timer);
        timer = setTimeout(()=> {
            fn.apply(context, args);
        }, wait);
    }
}

//节流函数 https://github.com/sisterAn/JavaScript-Algorithms/issues/92
function throttle(fn, wait=50) {
    let previous = 0;

    return function(...args) {
        let context = this;

        let now = Date.now();
        if(now - previous >= wait){
            fn.apply(this, args);

            previous = now;
        }
    }
}

 // 手写 call 和 apply  https://github.com/sisterAn/JavaScript-Algorithms/issues/78
Function.prototype.call = function(context) {
    context = context? Object(context): window;
    context.fn = this;

    let args = [...arguments].slice(1);
    let result = context.fn(...args);

    delete context.fn;

    return result;
}

Function.prototype.apply = function(context, arr) {
    context = context? Object(context) : window;
    context.fn = this;

    let result;
    if(!arr) {
        result = context.fn();
    }else{
        result = context.fn(...arr);
    }

    delete context.fn;

    return result;
}

// new 操作符的实现  https://github.com/sisterAn/JavaScript-Algorithms/issues/71
function create(){
    // 1、获得构造函数，同时删除 arguments 中第一个参数
  Con = [].shift.call(arguments);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  let obj = Object.create(Con.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性.
  // 同时让构造函数作为函数执行一遍，产生一个构造函数的实例对象。
  let ret = Con.apply(obj, arguments);
  // 4、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}

// 给定一个二叉树，找到该树中两个指定节点间的最短距离
// https://github.com/sisterAn/JavaScript-Algorithms/issues/82
function theshort(root, p, q) {
    let lowestAncestor = findAncestor(root, p, q);

    let pDis = [], qDis = [];
    getPath(lowestAncestor, p, pDis);
    getPath(lowestAncestor, q, qDis);

    return pDis.length+qDis.length;
}
function findAncestor(root, p, q) {
    if(root === null || root === p || root === q) return root;
    let left = findAncestor(root.left, p, q);
    let right = findAcestor(root.right, p, q);
    if(!left){
        return right;
    }
    if(!right){
        return left;
    }
    if(left && right) return root;
}
function getPath(root, p, paths ){
    if(root === p ) return true;

    paths.push(root);
    let hasFound = false;
    if(root.left !== null) {
        hasFound = getPath(root.left, p, paths);
    }
    if(!hasFound && root.right !== null) {
        hasFound = getPath(root.right, p, paths);
    }

    if(!hasFound) {
        paths.pop();
    }

    return hasFound;
}

function largestRectangleArea (heights) {
    let stack = [];
    heights.unshift(0);
    heights.push(0);

    let ans = 0;
    for(let i =0; i < heights.length; i++) {
        while(stack.length && heights[stack[stack.length-1]] > heights[i]){
            let curr = stack.pop();
            if(stack.length) break;

            let width = (i-stack[stack.length-1]-1);
            ans = Math.max(ans, width*heights[curr])
        }
        stack.push(i);
    }

    return ans;
}


let integerReplacement = function(n) {
    if(n===1) return 0;
    if(n%2===0){
        return 1+integerReplacement(n/2);
    }else{
        return 1+Math.min(integerReplacement(n+1), integerReplacement(n-1));
    }
}

function canFinish(numCourses, prerequisites) {
    let edges = new Array(numCourses).fill(0).map(() => new Array(numCourses));
    let visited = new Array(numCourses).fill(0);
    for(let [u, v] of prerequisites){
        edges[v].push(u);
    }

    let valid = true;
    function dfs(u){
        visited[u] = 1;
        for(let  v of edges[u]){
            if(visited[v] === 0){
                dfs(v);
                if(!valid) return;
            }

            if(visited[v]  === 1) {
                valid = false;
                return;
            }
        }
        visited[u] = 2;
    }
    for(let i = 0; i < numCourses && valid; i++){
        if(visited[i]===0){
            dfs[i];
        }
    }

    return valid;
}

function hasPathSum (root, targetSum) {
    if(root === null) return false;
    if(root.left === null && root.right === null && root.val ===targetSum){
        return true;
    }else{
        return hasPathSum(root.left, targetSum-root.val) || 
        hasPathSum(root.right, targetSum-root.val)
    }
}

function buildTree(preorder, inorder){
    if(!preorder.length) return null;
    let root = new TreeNode(preorder[0]);
    let index = inorder.indexOf(preorder[0]);
    let inleft = inorder.slice(0, index);
    let inright = inorder.slice(index+1);

    let preleft = preorder.slice(1, index+1);
    let preright = preorder.slice(index+1);

    root.left = buildTree(preleft, inleft);
    root.right = buildTree(preright, inright);

    return root;
}

let lengthOfLongestSubstring = function (s) {
    let window = new Map();
    let left = 0;
    let right = 0;

    let res = 0;
    while(right<s.length){
        let c = s[right];
        right++;
        if(map.has(c)){
            map.set(c, map.get(c)+1);
        }else{
            map.set(c, 1);
        }

        while(window.get(c)>1){
            let d = s[left];
            left++;
            window.set(d, window.get(d)-1);
        }

        res = Math.max(res, right-left);
    }

    return res;
}




let longestCommonPrefix = function(strs) {
    let res = "";
    for(let i = 0; i< strs[0].length; i++) {
        for(let j = 1; j< strs.length; j++) {
            if(strs[0][i] !== strs[j][i]){
                return res;
            }
        }

        res+=strs[0][i];
    }

    return res;
}

let removeDuplicate = function(s) {
    let stack = [];
    for(let el of s ){
        if(stack[stack.length-1] === el){
            stack.pop();
        }else{
            stack.push(el);
        }
    }

    return stack.join('');
}

function spawn(genF){
    return new Promise(function(resolve, reject){
        let gen = genF();

        function step(nextF){
            let next;
            try{
                next = nextF();
            }catch(e) {
                return reject(e);
            }

            if(next.done) {
                return resolve(next.value);
            }

            Promise.resolve(next.value).then(function(v){
                step(function(){ return gen.next(v); });
            }, function(e){
                step(function(){ return gen.thow(e); });
            })
        }

        step(function(){ return gen.next(undefined); });
    })
}

function largestPalindrome (s) {
    let map = new Map();
    for(let el of s){
        map.set(el, (map.get(el) || 0)+1 );
    }

    let oneCenter = false;
    let res = 0;
    if(map.size>1){
        for(let [key, val] of map.entries()){
            if(val%2==0){
                res+=val;
            }else{
                if(oneCenter){
                    res+=(val-1);]
                }else{
                    res+=val;
                    oneCenter=true;
                }
            }
        }

        return res;
    }else{
        return s.length;
    }
    
}

let LRUCache = function(capacity) {
    this.cache = new Map();
    this.capacity = capacity;

}

LRUCache.prototype.get = function(key) {
    if(this.cache.has(key)){
        let temp = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, temp);
        return temp;
    }
    return -1;
}

LRUCache.prototype.set = function(key, val) {
    if(this.has(key)){
        this.cache.delete(key);
    }else if(this.cache.size>=this.capacity){
        this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, val);
}

// 链表求和
let addTwoList = function(l1, l2) {
    let head = null;
    let tail = null;

    let tmp = 0;
    while(l1 || l2) {
        let n1 = l1 ? l1.val : 0;
        let n2 = l2 ? l2.val: 0;
        let sum = n1+n2+tmp;

        if(head===null){
            head = tail = new ListNode(sum%10);
        }else{
            tail.next = new ListNode(sum%10);
            tail = tail.next();
        }
        tmp = Math.floor(sum/10);

        if(l1){
            l1 = l1.next;
        }
        if(l2){
            l2 = l2.next;
        }

    }

    if(tmp>0){
        tail.next = new ListNode(tmp);
    }

    return head;
}

// 合并两个有序链表
function mergeTwoList(list1, list2) {
    if(list1 === null) {
        return list2;
    }
    if(list2 === null) {
        return list1;
    }
    if(list1.val<=list2.val){
        list1.next = mergeTwoList(list1.next, list2);
        return list1;
    }else{
        list2.next = mergeTwoList(list2.next, list1);
        return list2;
    }
}

//三数字之和
function threeSum(nums) {
    if(!nums || nums.length<3) return [];

    let res = [];
    let second;
    let third;

    nums.sort((a, b) => a-b);
    for(let i = 0; i < nums.length; i++) {
        if(nums[i]>0) break;
        if(i>0 && nums[i]===nums[i-1]) continue;  //如果 这次的nums[first] === 上一轮的nums[first]， 那么直接跳过，避免重复

        second = i+1;
        third = nums.length-1;
        while(second<third){
            let sum = nums[i] + nums[second] + nums[third];
            if(sum === 0){
                res.push([ nums[i], nums[second ], nums[third] ]);
                while(second<third && nums[second+1] === nums[second]){
                    second++;
                }
                second++;
                while(second<third && nums[third-1] === nums[third]){
                    third--;
                }
                third--;
            }
            if(sum<0){
                second++;
            }
            if(sum>0){
                third--;
            }

        }
    }

    return res;
}

function robLoopHouse(nums) {
    if(nums === null || nums.length ===0) return 0;
    if(nums.length===1) return nums[0];
    if(nums.length === 2) reutrn Math.max(...nums);

    let n = nums.length;
    function getMaxdp( start, end ){
        let dp = new Array(n);
        dp[start ] = nums[start];
        dp[start+1] = nums[start+1];
        for(let i = start+2 ; i<=end; i++) {
            dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i]);
        }

        return dp[end];
    }

    return Math.max(getMaxdp(0, n-2), getMaxdp(1, n-1));
}

let splitFibonacci = function(num) {
    let track = [];
    let res = [];

    function backTrack(start) {
        if(track.lengthj>=3 && start ===  num.length) {
            res.push(track.slice());
            return;
        }
        for(let i = start; i < num.length; i++ ){
            let curr = s.slice(start, i+1);
            if(curr.length>1 && curr[0]==='0') return;
            curr = +curr;
            if(curr<0 || curr>Math.pow(2, 32)) return;
            if(track.length<2 || curr === track[track.length-1] + track[track.length-1]){
                track.push(curr);
                backTrack(i+1);
                track.pop();
            }

        }
    }

    backTrack(0);
    return res;
}

//1-n中间取K个数的组合
function combine(n, k) {
    let track = [];
    let res = [];
    function backTrack(start){
        if(track.length===k){
            res.push(track.slice());
        }
        for(let i = start; i<=n; i++){
            track.push(i);
            backTrack(i+1);
            track.pop();
        }
    }
    backTrack(0);
    return res;
}

//全排列
function allSort(nums){
    let track = [];
    let res = [];
    function backTrack() {
        if(track.length === nums.length){
            res.push(track.slice());
            return;
        }

        for(let num of nums ){
            if(!track.includes(num)){
                track.push(num);
                backTrack();
                track.pop();
            }
        }
    }
    backTrack();
    return res;
}

// 二叉树的中根遍历
let inorderTraversal = function(root) {
    let ans = [];
    function dfs(root){
        if(root === null) return;
        dfs(root.left);
        ans.push(root.val);
        dfs(root.right);
    }

    dfs(root);
    return ans;
}

function minTaps(n, ranges) {
    let clips = [];
    for(let i = 0; i<= n; i++) {
        clips.push([i-ranges[i]], [i+ranges[i]]);
    }

    let last = 0;
    let tmp;
    let res = 0;
    for(let i = 0; i < clips.length; i++) {
        tmp = 0;
        for(let j=0; j<clips.length; j++){
            if(clips[j][0] < last) {
                tmp = Math.max(tmp, clips[j][1]);
            }
        }
        last = tmp;
        ans++;
        if(last>=n) return ans;
    }

    return -1;
}

function spawn(genF){
    return new Promise(function(resolve, reject){
        let gen = genF();

        function step(nextF) {
            let next;
            try{
                next = nextF();
            }catch(e){
                return reject(e);
            }

            if(next.done){
                return resolve(next.value);
            }

            Promise.resolve(next.value).then(function(val){
                return step(function(){ gen.next(val); });
            }, function(err){
                return step( function() {gen.throw(err); });
            });

        }

        step(function(){ return gen.next(undefined); });
    })
}