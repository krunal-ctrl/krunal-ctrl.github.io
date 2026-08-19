---
title: Group Anagrams
---

## Link
https://leetcode.com/problems/group-anagrams

## Pattern
- [[Patterns/Hash-Map-Lookup]]

## Approach

For each string, build a 26-length letter-frequency count (`count[ord(c) - ord('a')] += 1`). Two strings are anagrams exactly when they have the same count array, so use `tuple(count)` as a hashable dict key and group strings under it in a `defaultdict(list)`. One pass over `strs`, O(1) average work per character. At the end, `res.values()` holds every anagram group.

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        res = defaultdict(list) # mapping charCount ot list of Anagrams

        for s in strs:
            count = [0] * 26 # a ... z

            for c in s:
                count[ord(c) - ord('a')] += 1

            res[tuple(count)].append(s)

        return list(res.values())
```

## Complexity
- Time: O(n * k) — n strings, k = max string length, for building each count array
- Space: O(n * k) — storing n count-array keys plus the grouped strings themselves

## sketch
![[Excalidraw/GroupAnagrams.excalidraw.light.svg]]
![[Excalidraw/GroupAnagrams.excalidraw.dark.svg]]

## Gotchas
- Using `count` as a list works for hashing only after converting to `tuple(count)` — a plain list isn't hashable and can't be a dict key.
- Assumes lowercase a-z only; uppercase or unicode input would need a different count size or a `Counter`/sorted-string key instead.

Tags: #pattern/Hash-Map-Lookup #topic/Arrays #difficulty/Medium #status/new
