---
title: Valid Anagram
---

## Link
https://leetcode.com/problems/valid-anagram

## Pattern
- [[Two-Pointer]]

## Approach

using Frequency counter we can track number of characters present in array, if strings are not of same length they are not anagrams of each other

otherwise in single pass `i` over `len(s)` we increase count of character from string `s` and decrease count of charter from string `t` at index `i` 

If characters are anagrams after iteration array map should have count of `0` at all places to be valid anagram

```python
def isAnagram(self, s: str, t: str) -> bool:

        if len(s) != len(t):
            return False

        arrMap = [0] * 27
        for i in range(len(s)):
            arrMap[ord(s[i]) - 97] += 1
            arrMap[ord(t[i]) - 97] -= 1
            
        for i in arrMap:
            if i != 0:
                return False

        return True
```

## sketch

![[Excalidraw/ValidAnagram.excalidraw.light.svg]]
![[Excalidraw/ValidAnagram.excalidraw.dark.svg]]

Tags:  #pattern/Two-Pointer #topic/Arrays #difficulty/Easy 