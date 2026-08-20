## When to use
Contiguous subarray/substring problems optimizing a size, sum, or count condition. Expand the window's right edge each step; shrink from the left whenever the window becomes invalid, tracking the best window seen so far.

## Template code
```python
def sliding_window(arr, k):
    window_sum = 0
    left = 0
    best = 0
    for right in range(len(arr)):
        window_sum += arr[right]
        while window_sum > k:
            window_sum -= arr[left]
            left += 1
        best = max(best, right - left + 1)
    return best
```

## Problems using this pattern
See problems tagged #pattern/Sliding-Window.

Tags: #pattern/Sliding-Window
