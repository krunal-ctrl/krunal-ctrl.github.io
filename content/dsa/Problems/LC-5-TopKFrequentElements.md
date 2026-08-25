

## Link
[Top K Frequent Elements - LeetCode](https://leetcode.com/problems/top-k-frequent-elements/)

## Pattern
[[Patterns/Hash-Map-Lookup]]

## Approach

The solution uses a hash table combined with a min heap to efficiently find the top `k` frequent elements.

**Step 1: Count Frequencies** First, we traverse the array and use a hash table `cnt` to count the occurrence of each element. In Python, we can use `Counter(nums)` which automatically creates a dictionary where keys are the unique elements and values are their frequencies.

**Step 2: Build and Maintain a Min Heap** We iterate through the hash table and use a min heap to keep track of the top `k` frequent elements. The heap stores pairs of `(frequency, element)`.

The process works as follows:

- For each element and its count in the hash table, we push the pair `(count, element)` into the min heap
- If the heap size exceeds `k`, we pop the smallest element (the one with minimum frequency)
- By maintaining the heap size at most `k`, we ensure that only the `k` most frequent elements remain

## Code
```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:

        count = Counter(nums)
        heap = []

        for num, freq in count.items():
            heapq.heappush(heap, (freq, num))
            if len(heap) > k:
                heapq.heappop(heap)

        return [num for freq, num in heap]
```

## Complexity
`O(n + m log k)` where `n` is the length of the input array and `m` is the number of unique elements.

The `Counter` constructor takes `O(n)` time to count frequencies. When a value of `k` is provided, `Counter.most_common(k)` uses a top-k selection strategy rather than sorting every unique element, so selecting the top `k` elements costs `O(m log k)`.

The space complexity is `O(m)` for the `Counter` object, which stores all unique elements and their frequencies. The top-k selection also uses auxiliary space proportional to `k`, but `O(m)` dominates overall.
## Sketch
![[TopKFrequentElement.excalidraw.light.svg]]
![[TopKFrequentElement.excalidraw.dark.svg]]

