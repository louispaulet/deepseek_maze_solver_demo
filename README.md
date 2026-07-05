# DeepSeek Maze Solver Demo

The goal of this repo is to test the capabilities of **DeepSeek V4 Pro** by generating mazes and comparing pathfinding algorithms to solve them — all rendered in the browser, in realtime.

**🔗 Live demo:** [maze-solver.thefrenchartist.dev](https://maze-solver.thefrenchartist.dev)

## Overview

- **Maze Generation** — 3 algorithms: Recursive Backtracking, Prim's, and Kruskal's. All support seeded deterministic output via a Mulberry32 PRNG.
- **Pathfinding Comparison** — Run up to 4 algorithms side-by-side: BFS, DFS, Dijkstra, and A*.
- **Realtime Visualization** — Step-by-step animation for both generation and solving, with play/pause/scrub/speed controls.
- **HiDPI Canvas Rendering** — DPR-aware Canvas rendering looks sharp on Retina displays.
- **90 Unit Tests** — Full test coverage for all algorithms and components via Vitest.

## Maze Generation Algorithms

| Algorithm                  | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| Recursive Backtracking     | DFS-based generator. Long, winding corridors with relatively few branches.  |
| Prim's Algorithm           | Randomized Prim's. Grows the maze from a single cell via a frontier.        |
| Kruskal's Algorithm        | Union-Find based. Randomly joins disjoint regions. Highly branching mazes.  |

## Pathfinding Algorithms

| Algorithm                  | Description                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- |
| BFS (Breadth-First Search) | Level-by-level exploration. Guaranteed shortest path on unweighted grid.     |
| DFS (Depth-First Search)   | Deep-branch-first exploration. Fast but non-optimal paths.                   |
| Dijkstra's Algorithm       | General shortest-path baseline. Same result as BFS on uniform-weight grids.  |
| A* (A-Star)                | Dijkstra + Manhattan heuristic. Most efficient — visits fewest cells.        |

## Tech Stack

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Build tool     | [Vite](https://vitejs.dev/)                         |
| UI framework   | [React 19](https://react.dev/)                      |
| Routing        | [React Router](https://reactrouter.com/) (HashRouter) |
| Styling        | [TailwindCSS v4](https://tailwindcss.com/)          |
| Testing        | [Vitest](https://vitest.dev/) + Testing Library     |
| Linting        | [ESLint v9](https://eslint.org/) (flat config)      |
| Deployment     | GitHub Pages via [`gh-pages`](https://www.npmjs.com/package/gh-pages) |
| Custom domain  | `maze-solver.thefrenchartist.dev`                   |

## Getting Started

```bash
# Install dependencies and start dev server
make up

# Lint the codebase
make lint

# Run tests
make test

# Production build
make build

# Deploy to GitHub Pages (builds, copies CNAME, publishes gh-pages branch)
make deploy
```

Or with npm directly:

```bash
npm install
npm run dev        # → make up
npm run lint       # → make lint
npm test           # → make test
npm run build      # → make build
npm run deploy     # → make deploy
```

## Project Structure

```
deepseek_maze_solver_demo/
├── public/
│   ├── CNAME                         # maze-solver.thefrenchartist.dev
│   └── vite.svg                      # Favicon
├── src/
│   ├── algorithms/                   # Pure logic — no React, no DOM
│   │   ├── constants.js              # Maze generation registry (3 algorithms)
│   │   ├── pathfindingConstants.js   # Pathfinding registry (4 algorithms)
│   │   ├── mazeUtils.js              # createGrid, shuffle, mulberry32 PRNG, applySteps
│   │   ├── mazeGenerator.js          # Re-exports all generators
│   │   ├── recursiveBacktracking.js  # Recursive Backtracking maze generator
│   │   ├── prim.js                   # Prim's algorithm maze generator
│   │   ├── kruskal.js                # Kruskal's algorithm maze generator (Union-Find)
│   │   ├── bfs.js                    # BFS pathfinding + getPassableNeighbors helper
│   │   ├── dfs.js                    # DFS (iterative) pathfinding
│   │   ├── dijkstra.js               # Dijkstra's pathfinding
│   │   ├── astar.js                  # A* pathfinding (Manhattan heuristic)
│   │   └── __tests__/                # 11 test files for all algorithm modules
│   ├── components/                   # Reusable UI components
│   │   ├── Navbar.jsx                # Sticky top navbar (3 links)
│   │   ├── Footer.jsx                # Site footer
│   │   ├── MazeCanvas.jsx            # Canvas renderer (DPR-aware, auto-scaling)
│   │   ├── MazeControls.jsx          # Algorithm/size/seed/animation controls
│   │   ├── SolverControls.jsx        # Pathfinding algorithm picker
│   │   ├── AnimationControls.jsx     # Play/pause/step/scrub/speed controls
│   │   ├── ResultsPanel.jsx          # Side-by-side comparison grid
│   │   ├── LoadingSkeleton.jsx       # Pulsing placeholder while loading
│   │   ├── ToastProvider.jsx         # Toast notification system (context + hook)
│   │   └── __tests__/                # 4 component test files
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAnimation.js           # Step-based animation playback
│   │   └── useGenerationAnimation.js # Maze generation step-by-step animation
│   ├── pages/                        # Route-level views
│   │   ├── Home.jsx                  # Landing page with feature cards
│   │   ├── About.jsx                 # About page with algorithm descriptions
│   │   ├── MazeSolver.jsx            # Main maze solver demo page
│   │   └── __tests__/                # 1 page test file
│   ├── App.jsx                       # Root component with Routes
│   ├── index.css                     # TailwindCSS import + toast animation keyframe
│   ├── main.jsx                      # Entry point, HashRouter
│   └── test-setup.js                 # Vitest + Testing Library setup
├── .gitignore
├── AGENTS.md                         # Instructions for coding agents
├── eslint.config.js                  # ESLint v9 flat config
├── index.html                        # Vite entry HTML
├── Makefile                          # up / lint / test / build / deploy
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js                    # Vite + React + TailwindCSS plugins
```

## Conventions

- **File size**: Keep every file between 70–100 lines. Split larger files into smaller components or utilities.
- **Components vs Pages**: Reusable UI pieces go in `src/components/`. Route-level views go in `src/pages/`.
- **Routing**: Uses `HashRouter` to avoid 404 issues on GitHub Pages. All routes are defined in `src/App.jsx`:
  - `/` → Home
  - `/maze-solver` → Maze Solver
  - `/about` → About
- **Styling**: Exclusive use of TailwindCSS utility classes. No custom CSS files outside of `src/index.css`.
- **Linting**: ESLint v9 with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. Run `make lint` before committing.
- **Testing**: Vitest with jsdom environment. Tests go in `__tests__/` next to the module they test. Run `make test`.
- **Deployment**: `make deploy` runs a production build, copies `public/CNAME` into `dist/`, and publishes the `gh-pages` branch. The site is served at `maze-solver.thefrenchartist.dev`.

## Benchmark Report

This project was built as an experiment to evaluate **DeepSeek V4 Pro** as a coding agent. A detailed analysis of the development process — including a full commit timeline, catalog of all bugs and hurdles, and an assessment of the model's strengths and weaknesses — is available in the benchmark report:

📄 **[benchmark_report.md](./benchmark_report.md)**

## License

MIT
