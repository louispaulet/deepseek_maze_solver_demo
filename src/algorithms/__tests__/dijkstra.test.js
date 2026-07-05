import { describe, it, expect } from 'vitest';
import { dijkstra } from '../dijkstra';
import { bfs } from '../bfs';
import { recursiveBacktracking } from '../recursiveBacktracking';

describe('dijkstra', () => {
  const { grid } = recursiveBacktracking(10, 10, 42);
  const start = { row: 0, col: 0 };
  const goal = { row: 9, col: 9 };

  it('returns visitedOrder and path', () => {
    const result = dijkstra(grid, start, goal);
    expect(result).toHaveProperty('visitedOrder');
    expect(result).toHaveProperty('path');
  });

  it('finds a valid path from start to goal', () => {
    const { path } = dijkstra(grid, start, goal);
    expect(path.length).toBeGreaterThan(1);
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(goal);
  });

  it('finds a path of same length as BFS (both optimal on unweighted grid)', () => {
    const { path: dPath } = dijkstra(grid, start, goal);
    const { path: bPath } = bfs(grid, start, goal);
    expect(dPath.length).toBe(bPath.length);
  });
});
