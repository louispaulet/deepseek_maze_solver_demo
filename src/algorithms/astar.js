import { getPassableNeighbors } from './bfs';

/**
 * Manhattan distance heuristic.
 */
function manhattan(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

/**
 * A* pathfinding algorithm with Manhattan heuristic.
 *
 * Combines Dijkstra's cost-so-far with a heuristic estimate to the goal,
 * making it the most efficient algorithm for grid-based pathfinding.
 *
 * @param {object[][]} grid - Maze grid
 * @param {{ row: number, col: number }} start
 * @param {{ row: number, col: number }} goal
 * @returns {{ visitedOrder: {row:number,col:number}[], path: {row:number,col:number}[] }}
 */
export function astar(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const closed = Array.from({ length: rows }, () => Array(cols).fill(false));
  const visitedOrder = [];

  gScore[start.row][start.col] = 0;

  const open = [{ row: start.row, col: start.col, f: manhattan(start, goal) }];

  while (open.length > 0) {
    let minIdx = 0;
    for (let i = 1; i < open.length; i++) {
      if (open[i].f < open[minIdx].f) minIdx = i;
    }
    const { row, col } = open[minIdx];
    open[minIdx] = open[open.length - 1];
    open.pop();

    if (closed[row][col]) continue;
    closed[row][col] = true;
    visitedOrder.push({ row, col });

    if (row === goal.row && col === goal.col) break;

    for (const [nr, nc] of getPassableNeighbors(grid, row, col)) {
      if (closed[nr][nc]) continue;
      const tentativeG = gScore[row][col] + 1;
      if (tentativeG < gScore[nr][nc]) {
        gScore[nr][nc] = tentativeG;
        parent[nr][nc] = { row, col };
        open.push({ row: nr, col: nc, f: tentativeG + manhattan({ row: nr, col: nc }, goal) });
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

  return { visitedOrder, path: path[0]?.row === start.row ? path : [] };
}
