## Topic
- [[Topics/Arrays]]

## When to use
Sorted array/string problems that need a pair or triplet satisfying some condition (sum, comparison, palindrome check). Converge two indices from opposite ends toward each other to avoid the O(n²) brute-force pair check.

## Template code
```python
def two_pointer(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return [left, right]
        elif current < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]
```

## Problems using this pattern
See problems tagged #pattern/Two-Pointer.

Tags: #pattern/Two-Pointer
