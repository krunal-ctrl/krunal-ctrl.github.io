## When to use
Problems with optimal substructure and overlapping subproblems (Fibonacci, knapsack, edit distance). Cache the result of each unique subproblem state so it's computed once and reused instead of recomputed.

## Template code
```python
from functools import lru_cache

@lru_cache(maxsize=None)
def solve(state):
    if is_base_case(state):
        return base_value(state)
    return combine(solve(next_state) for next_state in transitions(state))
```

## Problems using this pattern
See problems tagged #pattern/DP-Memoization.

Tags: #pattern/DP-Memoization
