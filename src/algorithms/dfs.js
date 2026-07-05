import { getPassableNeighbors, reconstructPath } from './bfs';

/**
 * Depth-First Search pathfinding on a maze grid.
 *
 * Uses an explicit stack (iterative DFS). Explores deep branches first.
 * Does NOT guarantee the shortest path.
 *
 * @param {object[][]} grid - Maze grid
 * @param {{ row: number, col: number }} start
 * @param {{ row: number, col: number }} goal
 * @returns {{ visitedOrder: {row:number,col:number}[], path: {row:number,col:number}[] }}
 */
export function dfs(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const visitedOrder = [];
  const stack = [start];

  while (stack.length > 0) {
    const { row, col } = stack.pop();
    if (visited[row][col]) continue;

    visited[row][col] = true;
    visitedOrder.push({ row, col });

    if (row === goal.row && col === goal.col) {
      return { visitedOrder, path: reconstructPath(parent, start, goal) };
    }

    for (const [nr, nc] of getPassableNeighbors(grid, row, col)) {
      if (!visited[nr][nc]) {
        parent[nr][nc] = { row, col };
        stack.push({ row: nr, col: nc });
      }
    }
  }

  return { visitedOrder, path: [] };
}
