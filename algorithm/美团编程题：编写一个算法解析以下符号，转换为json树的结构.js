//   编写一个算法解析以下符号，转换为json树的结构
let str = `<xml><div><p><a/></p><p></p></div></xml>`;

let startTagReg = /\<(\w+)\>/; // 匹配开始标签；
let endTagReg = /\<\/(\w+)\>/; // 匹配结束标签
let closeSelfTagReg = /\<(\w+)\/\>/; //匹配自闭合标签
let textNodeReg = /\>(.*?)\<\//; //匹配开始标签和结束标签中间的文本内容
let tagRegexp = /\<\/?(\w+)\/?\>/g; // 全局匹配标签

let matchedTags = str.match(tagRegexp); //在str中匹配到的标签数组

let htmlTree = null; //保存生成的节点树
let nodeStacks = []; // 保存遍历过程中的节点栈；
let currentNode = undefined; // 遍历过程中的正被遍历到的节点

function createNode(tag) {
  const tagName = tag.replace(tagRegexp, "$1");
  return {
    name: tagName,
    children: null,
  };
}

function insert(node) {
  if (htmlTree === null) {
    htmlTree = node;
  } else {
    if (currentNode.children === null) {
      currentNode.children = [node];
    } else {
      currentNode.children.push(node);
    }
  }
}

for (let tag of matchedTags) {
  if (startTagReg.test(tag)) {
    let node = createNode(tag); // 遇到开始标签，创建新节点
    insert(node); //向树插入新节点；
    nodeStacks.push(node); // 把新节点压入栈
    currentNode = nodeStacks[nodeStacks.length - 1];
  } else if (endTagReg.test(tag)) {
    let index = nodeStacks.findLastIndex(
      (elem) => elem.name === tag.replace(endTagReg, "$1")
    );
    nodeStacks.splice(index - 1);
    currentNode = nodeStacks[nodeStacks.length - 1];
  } else if (closeSelfTagReg.test(tag)) {
    let node = createNode(tag); // 创建新节点
    insert(node); // 插入新节点。 自闭合不需要进栈出栈
  }
}

console.log(matchedTags);
console.log(htmlTree); //已完成
