var removeNnode = function (head, n) {
  let fast = head;
  let slow = head;
  while (n--) {
    fast = fast.next;
  }
  if (!fast) {
    return head.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;

  return head;
};
