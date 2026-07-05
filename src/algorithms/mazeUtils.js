/**
 * Creates a fresh grid of cells, each with all four walls intact.
 * @param {number} rows
 * @param {number} cols
 * @returns {{ row: number, col: number, walls: { top: boolean, right: boolean, bottom: boolean, left: boolean } }[][]}
 */
export function createGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        walls: { top: true, right: true, bottom: true, left: true },
      });
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Returns in-bounds, unvisited neighbours of (row, col) in random order.
 */
export function getUnvisitedNeighbours(grid, row, col) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [
    { dr: -1, dc: 0, wall: 'top', opposite: 'bottom' },
    { dr: 1, dc: 0, wall: 'bottom', opposite: 'top' },
    { dr: 0, dc: -1, wall: 'left', opposite: 'right' },
    { dr: 0, dc: 1, wall: 'right', opposite: 'left' },
  ];

  const neighbours = [];
  for (const { dr, dc, wall, opposite } of dirs) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      neighbours.push({ nr, nc, wall, opposite });
    }
  }
  return neighbours;
}

/**
 * Fisher-Yates shuffle (in-place). Accepts an optional seeded random function.
 */
export function shuffle(arr, random = Math.random) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Clones a grid (all walls intact) and applies the first `count` wall-removal steps.
 * Used for animating maze generation step-by-step.
 */
export function applySteps(rows, cols, steps, count) {
  const grid = createGrid(rows, cols);
  for (let i = 0; i < Math.min(count, steps.length); i++) {
    const { row, col, wall } = steps[i];
    if (grid[row] && grid[row][col]) {
      grid[row][col].walls[wall] = false;
    }
  }
  return grid;
}

/**
 * Mulberry32 — a fast, seedable 32-bit PRNG.
 * @param {number} seed
 * @returns {() => number} Function returning [0, 1)
 */
export function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
