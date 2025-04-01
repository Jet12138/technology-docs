/*
二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，
或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 
若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。
二叉搜索树作为一种经典的数据结构，它既有链表的快速插入与删除操作的特点，又有数组快速查找的优势；
所以应用十分广泛，例如在文件系统和数据库系统一般会采用这种数据结构进行高效率的排序与检索操作。
*/

//创建二叉排序树（又叫，二叉搜索树，二叉排序树，其中序遍历的结果就是从小到大递增的排序结果。）
// https://github.com/sisterAn/JavaScript-Algorithms/issues/87
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype.show = function () {
    return this.data;
};

function BST() {
    this.root = null;
}

// insert方法构建的是二叉排序树，二叉排序树的性质是每个节点的值都比其左子节点的值大，都比其右子节点的值小。每个节点的子树也都是二叉排序树。
BST.prototype.insert = function (data) {
    let node = new Node(data, null, null);
    if (this.root === null) {
        this.root = node;
    } else {
        let current = this.root;
        let parent;
        while (true) {
            parent = current;
            if (data < current.data) {
                current = current.left;  // 这一步的意义： 指针从current上转移到current的左子节点上。指针在移动！
                if (current === null) {
                    parent.left = node;
                    break;
                }
            } else {
                current = current.right;
                if (current === null) {
                    parent.right = node;
                    break;
                }
            }
        }
    }
};

//二叉树先序遍历
BST.prototype.prevOrder = function (node, result = []) {
    if (node) {
        // console.log(node.show() + '');
        result.push(node.data);
        this.prevOrder(node.left);
        this.prevOrder(node.right);
    }
};

//开始用数据  测试以上算法
let bst = new BST();
let nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];
for (let elem of nums) {
    bst.insert(elem);
}

bst.prevOrder(bst.root);
export default {
    BST
}
