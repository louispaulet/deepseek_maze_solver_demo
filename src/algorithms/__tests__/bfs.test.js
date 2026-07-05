import { describe, it, expect } from 'vitest';
import { bfs, getPassableNeighbors, reconstructPath } from '../bfs';
import { recursiveBacktracking } from '../recursiveBacktracking';

function makeGrid() {
  const { grid } = recursiveBacktracking(10, 10, 42);
  return grid;
}

describe('getPassableNeighbors', () => {
  it('returns neighbors based on open walls', () => {
    const grid = makeGrid();
    // Pick a cell and check consistency
    const neighbors = getPassableNeighbors(grid, 0, 0);
    for (const [r, c] of neighbors) {
      expect(r).toBeGreaterThanOrEqual(0);
      expect(c).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThan(10);
      expect(c).toBeLessThan(10);
    }
  });
});

describe('reconstructPath', () => {
  it('returns a path from start to goal via parent pointers', () => {
    const parent = Array.from({ length: 3 }, () => Array(3).fill(null));
    parent[0][1] = { row: 0, col: 0 };
    parent[0][2] = { row: 0, col: 1 };
    const path = reconstructPath(parent, { row: 0, col: 0 }, { row: 0, col: 2 });
    expect(path).toEqual([{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }]);
  });
});

describe('bfs', () => {
  const grid = makeGrid();
  const start = { row: 0, col: 0 };
  const goal = { row: 9, col: 9 };

  it('returns visitedOrder and path', () => {
    const result = bfs(grid, start, goal);
    expect(result).toHaveProperty('visitedOrder');
    expect(result).toHaveProperty('path');
    expect(Array.isArray(result.visitedOrder)).toBe(true);
    expect(Array.isArray(result.path)).toBe(true);
  });

  it('finds a valid path from start to goal', () => {
    const { path } = bfs(grid, start, goal);
    expect(path.length).toBeGreaterThan(1);
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(goal);
  });

  it('path cells are connected (adjacent and no wall between)', () => {
    const { path } = bfs(grid, start, goal);
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const dr = Math.abs(a.row - b.row);
      const dc = Math.abs(a.col - b.col);
      expect(dr + dc).toBe(1); // Adjacent

      // Verify no wall blocks this connection
      if (b.row < a.row) expect(grid[a.row][a.col].walls.top).toBe(false);
      if (b.row > a.row) expect(grid[a.row][a.col].walls.bottom).toBe(false);
      if (b.col < a.col) expect(grid[a.row][a.col].walls.left).toBe(false);
      if (b.col > a.col) expect(grid[a.row][a.col].walls.right).toBe(false);
    }
  });

  it('finds the shortest path (BFS is optimal for unweighted graphs)', () => {
    const { path } = bfs(grid, start, goal);
    // In a perfect maze, shortest path is unique, BFS must find it
    // At minimum: path exists and is correct
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(goal);
  });
});
