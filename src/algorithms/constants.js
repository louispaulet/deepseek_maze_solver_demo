import { recursiveBacktracking } from './recursiveBacktracking';
import { prim } from './prim';
import { kruskal } from './kruskal';

export const ALGORITHMS = {
  'recursive-backtracking': { label: 'Recursive Backtracking', fn: recursiveBacktracking },
  prim: { label: "Prim's Algorithm", fn: prim },
  kruskal: { label: "Kruskal's Algorithm", fn: kruskal },
};
