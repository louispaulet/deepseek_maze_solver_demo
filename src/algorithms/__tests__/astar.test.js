import { describe, it, expect } from 'vitest';
import { astar } from '../astar';
import { bfs } from '../bfs';
import { recursiveBacktracking } from '../recursiveBacktracking';

describe('astar', () => {
  const { grid } = recursiveBacktracking(10, 10, 42);
  const start = { row: 0, col: 0 };
  const goal = { row: 9, col: 9 };

  it('returns visitedOrder and path', () => {
    const result = astar(grid, start, goal);
    expect(result).toHaveProperty('visitedOrder');
    expect(result).toHaveProperty('path');
  });

  it('finds a valid path from start to goal', () => {
    const { path } = astar(grid, start, goal);
    expect(path.length).toBeGreaterThan(1);
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(goal);
  });

  it('finds an optimal path (same length as BFS)', () => {
    const { path: aPath } = astar(grid, start, goal);
    const { path: bPath } = bfs(grid, start, goal);
    expect(aPath.length).toBe(bPath.length);
  });

  it('visits fewer or equal cells than BFS (heuristic prunes search)', () => {
    const { visitedOrder: aVisited } = astar(grid, start, goal);
    const { visitedOrder: bVisited } = bfs(grid, start, goal);
    expect(aVisited.length).toBeLessThanOrEqual(bVisited.length);
  });
});
