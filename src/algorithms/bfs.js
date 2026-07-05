/**
 * Breadth-First Search pathfinding on a maze grid.
 *
 * Explores level by level, guaranteed to find the shortest path
 * in an unweighted graph.
 *
 * @param {object[][]} grid - Maze grid
 * @param {{ row: number, col: number }} start
 * @param {{ row: number, col: number }} goal
 * @returns {{ visitedOrder: {row:number,col:number}[], path: {row:number,col:number}[] }}
 */
export function bfs(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const visitedOrder = [];
  const queue = [start];
  visited[start.row][start.col] = true;

  while (queue.length > 0) {
    const { row, col } = queue.shift();
    visitedOrder.push({ row, col });

    if (row === goal.row && col === goal.col) {
      return { visitedOrder, path: reconstructPath(parent, start, goal) };
    }

    for (const [nr, nc] of getPassableNeighbors(grid, row, col)) {
      if (!visited[nr][nc]) {
        visited[nr][nc] = true;
        parent[nr][nc] = { row, col };
        queue.push({ row: nr, col: nc });
      }
    }
  }

  return { visitedOrder, path: [] };
}

/**
 * Returns passable neighbors based on open walls.
 */
export function getPassableNeighbors(grid, row, col) {
  const rows = grid.length;
  const cols = grid[0].length;
  const neighbors = [];
  const { top, right, bottom, left } = grid[row][col].walls;

  if (!top && row > 0) neighbors.push([row - 1, col]);
  if (!bottom && row < rows - 1) neighbors.push([row + 1, col]);
  if (!left && col > 0) neighbors.push([row, col - 1]);
  if (!right && col < cols - 1) neighbors.push([row, col + 1]);

  return neighbors;
}

/** Reconstructs the path from start to goal via parent pointers. */
export function reconstructPath(parent, start, goal) {
  const path = [];
  let current = { row: goal.row, col: goal.col };
  while (current) {
    path.unshift(current);
    if (current.row === start.row && current.col === start.col) break;
    current = parent[current.row][current.col];
  }
  return path;
}
