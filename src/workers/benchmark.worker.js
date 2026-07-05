import { ALGORITHMS } from '../algorithms/constants';
import { PATHFINDING_ALGORITHMS } from '../algorithms/pathfindingConstants';

self.onmessage = (e) => {
  if (e.data.type !== 'run') return;

  const { tasks } = e.data;

  for (const task of tasks) {
    const { genAlgo, rows, cols, seed, pathAlgos } = task;
    let grid;

    try {
      const result = ALGORITHMS[genAlgo].fn(rows, cols, seed);
      grid = result.grid;
    } catch {
      continue;
    }

    const genLabel = ALGORITHMS[genAlgo].label;
    const size = `${rows}\u00d7${cols}`;
    const start = { row: 0, col: 0 };
    const goal = { row: rows - 1, col: cols - 1 };
    const totalCells = rows * cols;

    for (const key of pathAlgos) {
      const { label: pathLabel, fn } = PATHFINDING_ALGORITHMS[key];
      const t0 = performance.now();
      const { visitedOrder, path } = fn(grid, start, goal);
      const t1 = performance.now();

      self.postMessage({
        type: 'result',
        entry: {
          genAlgo,
          genLabel,
          size,
          pathAlgo: key,
          pathLabel,
          steps: visitedOrder.length,
          pathLength: path.length,
          pctVisited: Math.round((visitedOrder.length / totalCells) * 100),
          timeMs: Math.round(t1 - t0),
        },
      });
    }
  }

  self.postMessage({ type: 'done' });
};
