// 由于无法给出一致的p, q 节点，
// 只用new TreeNode(p, null, null) 和 new TreeNode(7, null, null)是计算不出来的。
// 无奈摊手，只学习算法思路吧。
// https://github.com/sisterAn/JavaScript-Algorithms/issues/82

// 先构造一棵二叉树，
// 数据和算法来源：
// https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = left === undefined ? null : right;
}

let buildTree = function (preorder, inorder) {
  if (!preorder.length) return null;
  let root = new TreeNode(preorder[0]);
  let index = inorder.indexOf(preorder[0]);
  let inleft = inorder.slice(0, index);
  let inright = inorder.slice(index + 1);
  let preleft = preorder.slice(1, index + 1);
  let preright = preorder.slice(index + 1);

  root.left = buildTree(preleft, inleft);
  root.right = buildTree(preright, inright);
  return root;
};
let treeroot = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);

//现在开始解题，整体解题思路：
// 1.先找到两个指定节点的最近公共祖先，
// 2. 再从最近公共祖先节点出发分别找到到两点的路径，
// 3. 最后结果为两条路径的length之和

// 步骤1. 找到两个指定节点的最近公共祖先的算法来自：
// https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (!left) return right;
  if (!right) return left;
  return root;
}

let ancestor = lowestCommonAncestor(
  treeroot,
  treeroot.left,
  treeroot.right.right
);

//步骤2.
const getPath = function (root, p, paths) {
  if (root === null) return;
  //找到节点返回true
  if (root === p) {
    hasFound = true;
    return;
  }
  paths.push(root);
  let hasFound = false;
  if (!hasFound && root.left !== null) {
    hasFound = getPath(root.left, p, paths);
  }
  if (!hasFound && root.right !== null) {
    hasFound = getPath(root.right, p, paths);
  }

  // 没有找到，说明不在这个节点下，则弹出。 // 这就是回溯法
  if (!hasFound) {
    paths.pop();
  }
  return hasFound;
};

let pDis = [],
  qDis = [];
// getPath(ancestor, new TreeNode(9, null, null), pDis);
// getPath(ancestor, new TreeNode(7, null, null), qDis);

getPath(ancestor, ancestor.left, pDis);
getPath(ancestor, ancestor.right, qDis);

// const shortestDistance = function(treeroot, p, q) {
//     // 最近公共祖先
//     let ancestor = lowestCommonAncestor(treeroot, p, q)
//     // 分别求出公共祖先到两个节点的路经
//     let pDis = [], qDis = []
//     getPath(ancestor, p, pDis)
//     getPath(ancestor, q, qDis)
//     // 返回路径之和
//     return (pDis.length + qDis.length)
// }

console.log(pDis, qDis);

console.log(pDis.length + qDis.length);

// 第二种写法：
function fn(root,node1,node2) {
  let res = 0
  const getParent = (root, node1, node2) => {
    if (!root || root === node1 || root === node2) return root
    const left = getParent(root.left, node1, node2)
    const right = getParent(root.right, node1, node2)
    if (!left) return right
    if (!right) return left
    return root
  }
  const getDis = (parent, child) => {
    if(!parent) return -1
    if (parent === child) return 0 
    const left = getDis(parent.left, child)
    const right = getDis(parent.right,child)
    
    if (left !== -1) return left+1
    if ( right!== -1) return right+1
    return -1
  }
  res = getDis(root, node1)
  res = getDis(root, node2)
  return res
}
