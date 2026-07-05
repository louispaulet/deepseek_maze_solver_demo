import { describe, it, expect } from 'vitest';
import { createGrid, getUnvisitedNeighbours } from '../mazeUtils';

describe('getUnvisitedNeighbours', () => {
  const grid = createGrid(5, 5);

  it('returns 2 neighbours for a corner cell (0,0)', () => {
    const result = getUnvisitedNeighbours(grid, 0, 0);
    expect(result).toHaveLength(2);
    const coords = result.map(({ nr, nc }) => `${nr},${nc}`).sort();
    expect(coords).toEqual(['0,1', '1,0']);
  });

  it('returns 3 neighbours for an edge cell (0,2)', () => {
    expect(getUnvisitedNeighbours(grid, 0, 2)).toHaveLength(3);
  });

  it('returns 4 neighbours for a centre cell (2,2)', () => {
    expect(getUnvisitedNeighbours(grid, 2, 2)).toHaveLength(4);
  });

  it('includes wall and opposite properties', () => {
    for (const n of getUnvisitedNeighbours(grid, 2, 2)) {
      expect(n).toHaveProperty('wall');
      expect(n).toHaveProperty('opposite');
      expect(n).toHaveProperty('nr');
      expect(n).toHaveProperty('nc');
    }
  });
});
