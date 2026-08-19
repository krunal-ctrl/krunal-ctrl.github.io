## When to use
Linked-list or sequence problems needing cycle detection, the middle element, or a cycle's starting node — one pointer advances twice as fast as the other, so if there's a cycle they're guaranteed to meet inside it.

## Template code
```python
def has_cycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False


def find_middle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

## Problems using this pattern
See problems tagged #pattern/Fast-Slow-Pointer.

Tags: #pattern/Fast-Slow-Pointer
