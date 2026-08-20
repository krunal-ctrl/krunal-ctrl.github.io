## When to use
Finding a value, or a boundary where some condition flips, in a sorted array — in O(log n) instead of a linear scan. Repeatedly halve the search range based on a comparison against the midpoint.

## Template code
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

## Problems using this pattern
See problems tagged #pattern/Binary-Search.

Tags: #pattern/Binary-Search
