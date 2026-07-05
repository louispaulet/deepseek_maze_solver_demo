import { describe, it, expect } from 'vitest';
import { kruskal } from '../kruskal';
import { prim } from '../prim';

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

describe('kruskal', () => {
  it('returns an object with grid and steps', () => {
    const result = kruskal(5, 5);
    expect(result).toHaveProperty('grid');
    expect(result).toHaveProperty('steps');
    expect(Array.isArray(result.steps)).toBe(true);
  });

  it('creates a grid with the correct dimensions', () => {
    const { grid } = kruskal(6, 10);
    expect(grid).toHaveLength(6);
    grid.forEach((row) => expect(row).toHaveLength(10));
  });

  it('generates a perfect maze where all cells are reachable', () => {
    for (let i = 0; i < 5; i++) {
      const { grid } = kruskal(10, 10);
      expect(allCellsReachable(grid)).toBe(true);
    }
  });

  it('produces deterministic output with a seed', () => {
    const a = kruskal(8, 8, 99);
    const b = kruskal(8, 8, 99);
    expect(a.steps).toEqual(b.steps);
  });

  it('produces different output with different seeds', () => {
    const a = kruskal(8, 8, 7);
    const b = kruskal(8, 8, 13);
    expect(a.steps).not.toEqual(b.steps);
  });

  it('enforces minimum size of 3', () => {
    const { grid } = kruskal(1, 2);
    expect(grid).toHaveLength(3);
    expect(grid[0]).toHaveLength(3);
  });

  it('works with default parameters', () => {
    const { grid } = kruskal();
    expect(grid).toHaveLength(15);
    expect(grid[0]).toHaveLength(15);
  });

  it('generates different mazes than prim (same seed)', () => {
    const { grid: kGrid } = kruskal(10, 10, 42);
    const { grid: pGrid } = prim(10, 10, 42);
    let identical = true;
    for (let r = 0; r < 10 && identical; r++) {
      for (let c = 0; c < 10 && identical; c++) {
        if (JSON.stringify(kGrid[r][c].walls) !== JSON.stringify(pGrid[r][c].walls)) {
          identical = false;
        }
      }
    }
    expect(identical).toBe(false);
  });
});
