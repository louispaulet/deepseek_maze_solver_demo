/**
 * Creates a fresh grid of cells, each with all four walls intact.
 * @param {number} rows
 * @param {number} cols
 * @returns {{ row: number, col: number, walls: { top: boolean, right: boolean, bottom: boolean, left: boolean } }[][]}
 */
function createGrid(rows, cols) {
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
function getUnvisitedNeighbours(grid, row, col) {
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
 * Fisher-Yates shuffle (in-place).
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

  // Seedable RNG (mulberry32)
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

/**
 * Mulberry32 — a fast, seedable 32-bit PRNG.
 * @param {number} seed
 * @returns {() => number} Function returning [0, 1)
 */
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default { recursiveBacktracking };
