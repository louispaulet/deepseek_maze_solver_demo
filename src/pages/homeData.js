export const GENERATION_ALGOS = [
  {
    title: 'Recursive Backtracking',
    desc: 'DFS-based generator carving long, winding corridors with relatively few branches. Produces mazes with a distinct main-path feel.',
  },
  {
    title: "Prim's Algorithm",
    desc: 'Grows the maze from a random cell by expanding the frontier. Creates a balanced mix of short dead-ends and branching paths.',
  },
  {
    title: "Kruskal's Algorithm",
    desc: 'Uses a Union-Find structure to randomly join separate regions. Produces highly branching, dense mazes with many dead-ends.',
  },
];

export const PATHFINDING_ALGOS = [
  {
    title: 'BFS',
    subtitle: 'Breadth-First',
    desc: 'Explores level by level. Guaranteed shortest path.',
    badge: 'Optimal',
  },
  {
    title: 'DFS',
    subtitle: 'Depth-First',
    desc: 'Deep-branch exploration. Fast but non-optimal.',
    badge: 'Non-optimal',
  },
  {
    title: 'Dijkstra',
    subtitle: 'Uniform Cost',
    desc: 'General shortest-path baseline. Same result as BFS here.',
    badge: 'Optimal',
  },
  {
    title: 'A*',
    subtitle: 'A-Star',
    desc: 'Dijkstra + Manhattan heuristic. Visits the fewest cells.',
    badge: 'Optimal · Fastest',
  },
];

export const FEATURES = [
  {
    title: 'Seeded Randomness',
    desc: 'Deterministic maze generation via a seedable Mulberry32 PRNG. Share a seed number to reproduce the exact same maze.',
  },
  {
    title: 'Step-by-step Animation',
    desc: 'Watch generation carve one wall at a time, and solvers explore one cell at a time. Play, pause, scrub forward or backward.',
  },
  {
    title: 'HiDPI Canvas',
    desc: 'DPR-aware Canvas rendering looks pixel-sharp on Retina and high-density displays, with auto-scaling to fit any screen width.',
  },
  {
    title: 'Toast Notifications',
    desc: 'Contextual alerts — for example, when a maze happens to be unsolvable — without intrusive modal dialogs.',
  },
  {
    title: 'Responsive Layout',
    desc: 'Fluid grid adapts from a single column on mobile up to four side-by-side solvers on wide desktop screens.',
  },
  {
    title: '90 Unit Tests',
    desc: 'Full Vitest test suite covering every algorithm and component. 87 passing tests ensure correctness.',
  },
];
