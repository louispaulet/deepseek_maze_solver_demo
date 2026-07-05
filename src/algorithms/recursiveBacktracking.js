import { createGrid, getUnvisitedNeighbours, shuffle, mulberry32 } from './mazeUtils';

/**
 * Generates a maze using the Recursive Backtracking algorithm (DFS-based).
 *
 * Returns an object with:
 *   - grid: the carved maze grid
 *   - steps: array of wall-removal actions for animation playback
 *
 * @param {number} rows - Number of rows (min 3, default 15)
 * @param {number} cols - Number of columns (min 3, default 15)
 * @param {number} [seed] - Optional seed for deterministic generation
 * @returns {{ grid: object[][], steps: { row: number, col: number, wall: string }[] }}
 */
export function recursiveBacktracking(rows = 15, cols = 15, seed) {
  rows = Math.max(3, rows);
  cols = Math.max(3, cols);

  const random = seed ? mulberry32(seed) : Math.random;

  const grid = createGrid(rows, cols);
  const visited = new Set();
  const steps = [];

  // Start at a random cell
  const startRow = Math.floor(random() * rows);
  const startCol = Math.floor(random() * cols);
  const stack = [[startRow, startCol]];
  visited.add(`${startRow},${startCol}`);

  while (stack.length > 0) {
    const [row, col] = stack[stack.length - 1];

    const candidates = getUnvisitedNeighbours(grid, row, col).filter(
      ({ nr, nc }) => !visited.has(`${nr},${nc}`)
    );

    if (candidates.length === 0) {
      stack.pop();
      continue;
    }

    shuffle(candidates, random);
    const { nr, nc, wall, opposite } = candidates[0];

    // Carve passage between current cell and chosen neighbour
    grid[row][col].walls[wall] = false;
    grid[nr][nc].walls[opposite] = false;

    steps.push({ row, col, wall });
    steps.push({ row: nr, col: nc, wall: opposite });

    visited.add(`${nr},${nc}`);
    stack.push([nr, nc]);
  }

  return { grid, steps };
}
