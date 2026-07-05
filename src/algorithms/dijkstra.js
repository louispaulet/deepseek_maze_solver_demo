import { getPassableNeighbors } from './bfs';

/**
 * Dijkstra's algorithm for pathfinding on a maze grid.
 *
 * All edge weights are 1 (unweighted grid), so BFS would suffice,
 * but Dijkstra's is included as a baseline for comparison.
 *
 * @param {object[][]} grid - Maze grid
 * @param {{ row: number, col: number }} start
 * @param {{ row: number, col: number }} goal
 * @returns {{ visitedOrder: {row:number,col:number}[], path: {row:number,col:number}[] }}
 */
export function dijkstra(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const visitedSet = Array.from({ length: rows }, () => Array(cols).fill(false));
  const visitedOrder = [];

  dist[start.row][start.col] = 0;

  // Simple priority queue using a sorted array (fine for maze sizes < 100×100)
  const pq = [{ row: start.row, col: start.col, dist: 0 }];

  while (pq.length > 0) {
    // Extract min (could be optimized with a binary heap)
    let minIdx = 0;
    for (let i = 1; i < pq.length; i++) {
      if (pq[i].dist < pq[minIdx].dist) minIdx = i;
    }
    const { row, col } = pq[minIdx];
    pq[minIdx] = pq[pq.length - 1];
    pq.pop();

    if (visitedSet[row][col]) continue;
    visitedSet[row][col] = true;
    visitedOrder.push({ row, col });

    if (row === goal.row && col === goal.col) break;

    for (const [nr, nc] of getPassableNeighbors(grid, row, col)) {
      const newDist = dist[row][col] + 1;
      if (newDist < dist[nr][nc]) {
        dist[nr][nc] = newDist;
        parent[nr][nc] = { row, col };
        pq.push({ row: nr, col: nc, dist: newDist });
      }
    }
  }

  const path = [];
  let cur = { row: goal.row, col: goal.col };
  while (cur) {
    path.unshift(cur);
    if (cur.row === start.row && cur.col === start.col) break;
    cur = parent[cur.row][cur.col];
  }

  return { visitedOrder, path: path[0].row === start.row ? path : [] };
}
