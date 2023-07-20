//创建二叉排序树（又叫，二叉搜索树，二叉排序树，其中序遍历的结果就是从小到大递增的排序结果。）
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
BST.prototype.prevOrder = function (node) {
    if (node) {
        // console.log(node.show() + '');
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
