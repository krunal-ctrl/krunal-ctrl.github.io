## When to use
A list of `(start, end)` ranges that need combining, inserting, or checking for overlaps. Sort by start time, then sweep through and merge whenever the next interval's start falls at or before the current merged interval's end.

## Template code
```python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
```

## Problems using this pattern
See problems tagged #pattern/Merge-Intervals.

Tags: #pattern/Merge-Intervals
