import { describe, it, expect } from 'vitest';
import { recursiveBacktracking } from '../recursiveBacktracking';

/** BFS to verify all cells are reachable from (0,0). */
function allCellsReachable(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [[0, 0]];
  visited[0][0] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const { top, right, bottom, left } = grid[r][c].walls;
    if (!top && r > 0 && !visited[r - 1][c])    { visited[r - 1][c] = true; queue.push([r - 1, c]); }
    if (!bottom && r < rows - 1 && !visited[r + 1][c]) { visited[r + 1][c] = true; queue.push([r + 1, c]); }
    if (!left && c > 0 && !visited[r][c - 1])     { visited[r][c - 1] = true; queue.push([r, c - 1]); }
    if (!right && c < cols - 1 && !visited[r][c + 1])  { visited[r][c + 1] = true; queue.push([r, c + 1]); }
  }

  return visited.every((row) => row.every((v) => v));
}

/** Count how many walls have been removed in the grid. */
function countOpenWalls(grid) {
  let open = 0;
  for (const row of grid) {
    for (const cell of row) {
      const { top, right, bottom, left } = cell.walls;
      if (!top) open++;
      if (!right) open++;
      if (!bottom) open++;
      if (!left) open++;
    }
  }
  return open;
}

describe('recursiveBacktracking', () => {
  it('returns an object with grid and steps', () => {
    const result = recursiveBacktracking(5, 5);
    expect(result).toHaveProperty('grid');
    expect(result).toHaveProperty('steps');
    expect(Array.isArray(result.steps)).toBe(true);
  });

  it('creates a grid with the correct dimensions', () => {
    const { grid } = recursiveBacktracking(8, 12);
    expect(grid).toHaveLength(8);
    grid.forEach((row) => expect(row).toHaveLength(12));
  });

  it('generates a perfect maze where all cells are reachable', () => {
    for (let i = 0; i < 5; i++) {
      const { grid } = recursiveBacktracking(10, 10);
      expect(allCellsReachable(grid)).toBe(true);
    }
  });

  it('produces deterministic output with a seed', () => {
    const a = recursiveBacktracking(8, 8, 42);
    const b = recursiveBacktracking(8, 8, 42);
    expect(a.steps).toEqual(b.steps);
  });

  it('produces different output with different seeds', () => {
    const a = recursiveBacktracking(8, 8, 1);
    const b = recursiveBacktracking(8, 8, 2);
    expect(a.steps).not.toEqual(b.steps);
  });

  it('removes walls (grid is not fully intact)', () => {
    const { grid } = recursiveBacktracking(5, 5);
    expect(countOpenWalls(grid)).toBeGreaterThan(0);
  });

  it('enforces minimum size of 3', () => {
    const { grid } = recursiveBacktracking(1, 1);
    expect(grid).toHaveLength(3);
    expect(grid[0]).toHaveLength(3);
  });

  it('works with default parameters', () => {
    const { grid } = recursiveBacktracking();
    expect(grid).toHaveLength(15);
    expect(grid[0]).toHaveLength(15);
  });
});
