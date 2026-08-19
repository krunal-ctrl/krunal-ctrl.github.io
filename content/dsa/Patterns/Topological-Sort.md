## When to use
Ordering tasks or nodes in a DAG under "must come before" dependency constraints. Process a node only once all its prerequisites have been processed — via Kahn's in-degree BFS or DFS post-order.

## Template code
```python
from collections import deque

def topological_sort(num_nodes, edges):
    graph = {i: [] for i in range(num_nodes)}
    in_degree = {i: 0 for i in range(num_nodes)}
    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    queue = deque([n for n in in_degree if in_degree[n] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == num_nodes else []  # empty means a cycle exists
```

## Problems using this pattern
See problems tagged #pattern/Topological-Sort.

Tags: #pattern/Topological-Sort
