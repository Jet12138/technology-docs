function TreeNode(val, left, right){
    this.val = (val===undefined)? 0: val;
    this.left = (left === undefined)? null: left;
    this.right = (right === undefined)? null: right;
}

function CreateTree(){
    this.root = null;
}

CreateTree.prototype.insert = function(val){
    let node = new TreeNode(val, null, null);
    if(this.root === null){
        this.root = node;
    }else{
        let current = this.root;
        let parent;
        while(true){
            parent = current;
            if(val < current.val){
                current = current.left;
                if(current === null){
                    parent.left = node;
                    break;
                }
            }else{
                current = current.right;
                if(current === null){
                    parent.right = node;
                    break;
                }
            }
        }
    }
}

let tree = new CreateTree();
let array = [1,null,2,3];
for(let el of array){
    tree.insert(el);
}

console.log(tree);