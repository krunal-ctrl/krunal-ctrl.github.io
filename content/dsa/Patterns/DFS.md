## When to use
Exploring all paths, detecting cycles, finding connected components, or any backtracking-style search over a graph or tree. Go as deep as possible before backtracking, via recursion or an explicit stack.

## Template code
```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    order = [start]
    for neighbor in graph[start]:
        if neighbor not in visited:
            order += dfs(graph, neighbor, visited)
    return order
```

## Problems using this pattern
See problems tagged #pattern/DFS.

Tags: #pattern/DFS
