// 每隔 K 个就 reverse 一次，不足k就返回

function reverseKGroup(head, k) {
  let a = head;
  let b = head;

  while (k-- > 0) {
    //例如k=3, 则： 3，2，1时都while函数体都会执行，则，b = b.next.next.next,所以此时b是本组长度为k的组合的最后一个节点的下一个节点，也即是：下一个长度为k的组合的第一个节点。
    if (b === null) {
      return head;
    }

    b = b.next;
  }

  let newHead = reverse(a, b); //此时返回值是翻转后该段的头节点. 且a变成了该段的最后一个非null的节点。
  a.next = reverseKGroup(b, k); // reverse函数执行后a的下一个节点成了null，这里再重新接续绑定成下一个kGroup就行了。

  return newHead;
}

function reverse(a, b) {
  let pre = null;

  let curr = a;

  while (curr !== b) {
    //b是第k+1个节点。
    let next = curr.next;
    curr.next = pre; //while的第一次循环时，即a.next指向了pre(即 null)所以上面在执行了reverse函数后会重新给a.next指向别的节点。

    pre = curr;
    curr = next; //curr最后移动到b（第k+1个节点）的时候，pre正好在b前面一个节点的位置。即本段（k个节点）的最后一个节点。
  }

  return pre;
}

//上面的写法内存报告栈溢出了，可惜

//下面是第二种写法
var reverseKGroup = function (head, k) {
  if (!head) return head;
  let fast = head;
  let i = k;
  // 一. 判断是否够长
  while (i--) {
    // 例如k=3, 则： 3，2，1时都while函数体都会执行，则，fast = fast.next.next.next,
    // 所以此时fast是本组长度为k的组合的最后一个节点的下一个节点，
    // 也即是：下一个长度为k的组合的第一个节点。
    if (fast) {
      fast = fast.next;
    } else {
      return head;
    }
  }
  // 二. 够长就翻转当前的k段
  let j = k;
  let curr = head;
  let prev = null;
  while (j--) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // 三. 递归
  head.next = reverseKGroup(curr, k);
  return prev;
};
