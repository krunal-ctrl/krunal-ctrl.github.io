## When to use
Generating all valid combinations, permutations, or subsets under constraints (subsets, N-Queens, Sudoku). Choose a candidate, recurse, then undo the choice before trying the next one.

## Template code
```python
def backtrack(path, choices, results):
    if is_solution(path):
        results.append(path[:])
        return
    for choice in choices:
        if not is_valid(path, choice):
            continue
        path.append(choice)
        backtrack(path, choices, results)
        path.pop()
```

## Problems using this pattern
See problems tagged #pattern/Backtracking.

Tags: #pattern/Backtracking
