## Topic
- [[Topics/Arrays]]

## When to use
Need O(1) average lookup to check "have I seen this before" or "what index/count does this value map to." Trade space for a single linear pass instead of nested loops — Two Sum, duplicate checks, frequency counts.

## Template code
```python
def hash_map_lookup(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return [-1, -1]
```

## Problems using this pattern
See problems tagged #pattern/Hash-Map-Lookup.

Tags: #pattern/Hash-Map-Lookup
