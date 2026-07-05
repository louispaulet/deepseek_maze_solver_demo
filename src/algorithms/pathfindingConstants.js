import { bfs } from './bfs';
import { dfs } from './dfs';
import { dijkstra } from './dijkstra';
import { astar } from './astar';

export const PATHFINDING_ALGORITHMS = {
  bfs: { label: 'BFS (Breadth-First)', fn: bfs },
  dfs: { label: 'DFS (Depth-First)', fn: dfs },
  dijkstra: { label: "Dijkstra's Algorithm", fn: dijkstra },
  astar: { label: 'A* (A-Star)', fn: astar },
};
