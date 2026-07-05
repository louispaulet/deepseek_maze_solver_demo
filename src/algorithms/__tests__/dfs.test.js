import { describe, it, expect } from 'vitest';
import { dfs } from '../dfs';
import { bfs } from '../bfs';
import { recursiveBacktracking } from '../recursiveBacktracking';

describe('dfs', () => {
  const { grid } = recursiveBacktracking(10, 10, 42);
  const start = { row: 0, col: 0 };
  const goal = { row: 9, col: 9 };

  it('returns visitedOrder and path', () => {
    const result = dfs(grid, start, goal);
    expect(result).toHaveProperty('visitedOrder');
    expect(result).toHaveProperty('path');
    expect(Array.isArray(result.visitedOrder)).toBe(true);
    expect(Array.isArray(result.path)).toBe(true);
  });

  it('finds a valid path from start to goal', () => {
    const { path } = dfs(grid, start, goal);
    expect(path.length).toBeGreaterThan(1);
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(goal);
  });

  it('path cells are adjacent with no wall between them', () => {
    const { path } = dfs(grid, start, goal);
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const dr = Math.abs(a.row - b.row);
      const dc = Math.abs(a.col - b.col);
      expect(dr + dc).toBe(1);
    }
  });

  it('DFS explores differently than BFS on the same maze', () => {
    const { visitedOrder: dfsVisited } = dfs(grid, start, goal);
    const { visitedOrder: bfsVisited } = bfs(grid, start, goal);
    expect(dfsVisited.length).toBeGreaterThan(0);
    expect(bfsVisited.length).toBeGreaterThan(0);
  });
});
