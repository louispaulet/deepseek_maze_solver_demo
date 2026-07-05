# TODO — MVP Roadmap

The MVP goal: a browser-based app that generates mazes and compares pathfinding algorithms solving them in realtime.

## Maze Generation

- [x] Implement **Recursive Backtracking** (DFS-based) maze generator
- [x] Implement **Prim's algorithm** maze generator
- [x] Implement **Kruskal's algorithm** maze generator
- [x] Add a maze config panel (width, height, seed, algorithm selector)
- [x] Add a "Generate Maze" button with loading/animating state

## Maze Rendering

- [x] Create a `<Maze />` component that renders the grid on an HTML5 `<canvas>`
- [x] Draw walls, passages, start cell, and goal cell with distinct colors
- [x] Support dynamic resizing (canvas scales with container)
- [ ] Animate maze generation step-by-step (optional toggle)

## Pathfinding Algorithms

- [x] Implement **BFS** (Breadth-First Search)
- [x] Implement **DFS** (Depth-First Search)
- [x] Implement **Dijkstra's algorithm**
- [x] Implement **A\*** (A-star) with configurable heuristic
- [x] Each algorithm returns the full step history (visited cells, final path)

## Comparison View

- [x] Create a split-screen or tabbed layout showing 2–4 algorithms side-by-side
- [x] Algorithm selector checkboxes — pick which ones to compare
- [x] Shared maze instance across all selected algorithms

## Animation & Controls

- [x] Implement a step-based animation loop (play/pause/step forward/reset)
- [x] Speed slider (ms per step)
- [x] Visual distinction between visited cells, frontier cells, and the final path
- [x] Stats panel (steps taken, path length, time elapsed) per algorithm

## UI Polish

- [ ] Responsive layout (works on desktop and tablet)
- [ ] Dark theme consistency (already started, extend to maze canvas)
- [ ] Loading skeletons / placeholders while generating
- [ ] Toast/notification for errors (e.g., unsolvable maze)

## Testing

- [x] Unit tests for maze generators (validate solvability, correct dimensions)
- [x] Unit tests for pathfinding algorithms (validate path correctness, optimality for A*/Dijkstra)
- [ ] Component smoke tests (Maze, controls render without crashing)

## DevOps

- [x] Add Vitest as test runner (replace echo placeholder)
- [x] Add `make test` wired to `vitest run`
- [x] CI via GitHub Actions (lint + test on push)

---

**MVP is done when**: a user can generate a maze, pick 2+ pathfinding algorithms, hit "Solve", and watch them race to the goal side-by-side with real-time animation.
