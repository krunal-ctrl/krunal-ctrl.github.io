## When to use
Shortest path or minimum-steps problems in an unweighted graph or grid, or any level-by-level traversal. Explore all neighbors at the current depth before moving deeper, using a queue.

## Template code
```python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order
```

## Problems using this pattern
See problems tagged #pattern/BFS.

Tags: #pattern/BFS
