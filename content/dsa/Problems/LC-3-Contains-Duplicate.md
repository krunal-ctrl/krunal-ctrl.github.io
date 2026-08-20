
## Link
[Contains Duplicate - LeetCode](https://leetcode.com/problems/contains-duplicate/)

## Pattern
- [[Hash-Map-Lookup]]

## Approach

Yeah this would be a very simple approach where we do the initialize as set as an empty variable is a `seen` then iterate over the `nums`. If we find the numbers in a `seen` set then we will return `true`. Otherwise we will add that to a `seen` set. After all iteration if you don't find any repetition, we simply return `false`. 

```python
def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for i in nums:
            if i in seen:
                return True
            seen.add(i)
        return False
```

## sketch

![[ContainsDuplicate.excalidraw.light.svg]]
![[Excalidraw/ContainsDuplicate.excalidraw.dark.svg]]

Tags:  #pattern/Hash-Map-Lookup  #topic/Arrays #difficulty/Easy 