import { createGrid, shuffle, mulberry32 } from './mazeUtils';

/**
 * Union-Find (Disjoint Set) data structure with path compression.
 */
class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return false;
    if (this.rank[ra] < this.rank[rb]) {
      this.parent[ra] = rb;
    } else if (this.rank[ra] > this.rank[rb]) {
      this.parent[rb] = ra;
    } else {
      this.parent[rb] = ra;
      this.rank[ra]++;
    }
    return true;
  }
}

/**
 * Generates a maze using Kruskal's algorithm.
 *
 * Treats each cell as a separate set, then randomly removes walls between
 * cells in different sets until all cells are connected.
 *
 * @param {number} rows - Number of rows (min 3, default 15)
 * @param {number} cols - Number of columns (min 3, default 15)
 * @param {number} [seed] - Optional seed for deterministic generation
 * @returns {{ grid: object[][], steps: { row: number, col: number, wall: string }[] }}
 */
export function kruskal(rows = 15, cols = 15, seed) {
  rows = Math.max(3, rows);
  cols = Math.max(3, cols);

  const random = seed ? mulberry32(seed) : Math.random;
  const grid = createGrid(rows, cols);
  const uf = new UnionFind(rows * cols);
  const walls = [];
  const steps = [];

  // Collect all internal vertical walls (right wall of cell r,c)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      walls.push({ r1: r, c1: c, r2: r, c2: c + 1, wall: 'right', opposite: 'left' });
    }
  }

  // Collect all internal horizontal walls (bottom wall of cell r,c)
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols; c++) {
      walls.push({ r1: r, c1: c, r2: r + 1, c2: c, wall: 'bottom', opposite: 'top' });
    }
  }

  shuffle(walls, random);

  const id = (r, c) => r * cols + c;
  let needed = rows * cols - 1; // We need to carve exactly this many passages

  for (const { r1, c1, r2, c2, wall, opposite } of walls) {
    const id1 = id(r1, c1);
    const id2 = id(r2, c2);

    if (uf.union(id1, id2)) {
      grid[r1][c1].walls[wall] = false;
      grid[r2][c2].walls[opposite] = false;
      steps.push({ row: r1, col: c1, wall });
      steps.push({ row: r2, col: c2, wall: opposite });
      needed--;
      if (needed === 0) break;
    }
  }

  return { grid, steps };
}
