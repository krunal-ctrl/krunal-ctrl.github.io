---
title: Two Sum
---

## Link
https://leetcode.com/problems/two-sum/

## Pattern
- [[Patterns/Hash-Map-Lookup]]

## Approach
Single pass with a hash map. For each `num` at index `i`, compute `complement = target - num` and check if it's already in the map — if so, `[map[complement], i]` is the answer. Otherwise, store `num -> i` and continue. Checking before inserting avoids matching an element with itself.

```python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

## Complexity
- Time: O(n) — one pass, O(1) average hash map lookup/insert per element
- Space: O(n) — map holds up to n entries

## sketch
![[Excalidraw/TwoSum.excalidraw.light.svg]]
![[Excalidraw/TwoSum.excalidraw.dark.svg]]

## Gotchas
- 

Tags: #pattern/Hash-Map-Lookup #difficulty/Easy #status/new #topic/Arrays
