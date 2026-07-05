import { createGrid, getUnvisitedNeighbours, mulberry32 } from './mazeUtils';

/**
 * Generates a maze using Prim's algorithm.
 *
 * Starts with a random cell marked as part of the maze, then repeatedly
 * picks a random frontier wall and carves into the unvisited cell beyond it.
 *
 * @param {number} rows - Number of rows (min 3, default 15)
 * @param {number} cols - Number of columns (min 3, default 15)
 * @param {number} [seed] - Optional seed for deterministic generation
 * @returns {{ grid: object[][], steps: { row: number, col: number, wall: string }[] }}
 */
export function prim(rows = 15, cols = 15, seed) {
  rows = Math.max(3, rows);
  cols = Math.max(3, cols);

  const random = seed ? mulberry32(seed) : Math.random;
  const grid = createGrid(rows, cols);
  const inMaze = new Set();
  const walls = [];
  const steps = [];

  // Start at a random cell
  const startRow = Math.floor(random() * rows);
  const startCol = Math.floor(random() * cols);
  inMaze.add(`${startRow},${startCol}`);

  // Add starting cell's walls to the frontier
  for (const { nr, nc, wall } of getUnvisitedNeighbours(grid, startRow, startCol)) {
    walls.push({ row: startRow, col: startCol, nr, nc, wall });
  }

  while (walls.length > 0) {
    // Pick a random wall from the frontier
    const idx = Math.floor(random() * walls.length);
    const { row, col, nr, nc, wall } = walls[idx];

    // Remove it from the list (swap-remove for O(1))
    walls[idx] = walls[walls.length - 1];
    walls.pop();

    if (inMaze.has(`${nr},${nc}`)) continue;

    // Carve passage
    const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[wall];
    grid[row][col].walls[wall] = false;
    grid[nr][nc].walls[opposite] = false;

    steps.push({ row, col, wall });
    steps.push({ row: nr, col: nc, wall: opposite });

    inMaze.add(`${nr},${nc}`);

    // Add the new cell's walls to the frontier
    for (const neighbour of getUnvisitedNeighbours(grid, nr, nc)) {
      if (!inMaze.has(`${neighbour.nr},${neighbour.nc}`)) {
        walls.push({
          row: nr,
          col: nc,
          nr: neighbour.nr,
          nc: neighbour.nc,
          wall: neighbour.wall,
        });
      }
    }
  }

  return { grid, steps };
}
