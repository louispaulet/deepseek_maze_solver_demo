import { describe, it, expect } from 'vitest';
import { createGrid } from '../mazeUtils';

describe('createGrid', () => {
  it('creates a grid with the correct dimensions', () => {
    const grid = createGrid(5, 7);
    expect(grid).toHaveLength(5);
    grid.forEach((row) => expect(row).toHaveLength(7));
  });

  it('sets correct row/col properties on each cell', () => {
    const grid = createGrid(3, 4);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        expect(grid[r][c].row).toBe(r);
        expect(grid[r][c].col).toBe(c);
      }
    }
  });

  it('initialises all walls as true (intact)', () => {
    const grid = createGrid(3, 3);
    for (const row of grid) {
      for (const cell of row) {
        expect(cell.walls).toEqual({ top: true, right: true, bottom: true, left: true });
      }
    }
  });

  it('handles 1×1 grid', () => {
    const grid = createGrid(1, 1);
    expect(grid).toHaveLength(1);
    expect(grid[0]).toHaveLength(1);
  });
});
