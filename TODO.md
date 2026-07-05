# TODO — MVP Roadmap

The MVP goal: a browser-based app that generates mazes and compares pathfinding algorithms solving them in realtime.

## Maze Generation

- [x] Implement **Recursive Backtracking** (DFS-based) maze generator
- [x] Implement **Prim's algorithm** maze generator
- [ ] Implement **Kruskal's algorithm** maze generator
- [ ] Add a maze config panel (width, height, seed, algorithm selector)
- [ ] Add a "Generate Maze" button with loading/animating state

## Maze Rendering

- [ ] Create a `<Maze />` component that renders the grid on an HTML5 `<canvas>`
- [ ] Draw walls, passages, start cell, and goal cell with distinct colors
- [ ] Support dynamic resizing (canvas scales with container)
- [ ] Animate maze generation step-by-step (optional toggle)

## Pathfinding Algorithms

- [ ] Implement **BFS** (Breadth-First Search)
- [ ] Implement **DFS** (Depth-First Search)
- [ ] Implement **Dijkstra's algorithm**
- [ ] Implement **A\*** (A-star) with configurable heuristic
- [ ] Each algorithm returns the full step history (visited cells, final path)

## Comparison View

- [ ] Create a split-screen or tabbed layout showing 2–4 algorithms side-by-side
- [ ] Algorithm selector checkboxes — pick which ones to compare
- [ ] Shared maze instance across all selected algorithms

## Animation & Controls

- [ ] Implement a step-based animation loop (play/pause/step forward/reset)
- [ ] Speed slider (ms per step)
- [ ] Visual distinction between visited cells, frontier cells, and the final path
- [ ] Stats panel (steps taken, path length, time elapsed) per algorithm

## UI Polish

- [ ] Responsive layout (works on desktop and tablet)
- [ ] Dark theme consistency (already started, extend to maze canvas)
- [ ] Loading skeletons / placeholders while generating
- [ ] Toast/notification for errors (e.g., unsolvable maze)

## Testing

- [ ] Unit tests for maze generators (validate solvability, correct dimensions)
- [ ] Unit tests for pathfinding algorithms (validate path correctness, optimality for A*/Dijkstra)
- [ ] Component smoke tests (Maze, controls render without crashing)

## DevOps

- [ ] Add Vitest as test runner (replace echo placeholder)
- [ ] Add `make test` wired to `vitest run`
- [ ] CI via GitHub Actions (lint + test on push)

---

**MVP is done when**: a user can generate a maze, pick 2+ pathfinding algorithms, hit "Solve", and watch them race to the goal side-by-side with real-time animation.
