# DeepSeek Maze Solver Demo

The goal of this repo is to test the capabilities of **DeepSeek V4 Pro** by generating mazes and comparing pathfinding algorithms to solve them — all rendered in the browser, in realtime.

## Overview

- **Maze Generation** — Procedurally generated mazes using algorithms like Recursive Backtracking, Prim's, and Kruskal's.
- **Pathfinding Comparison** — Side-by-side comparison of BFS, DFS, Dijkstra, A\*, and other pathfinding algorithms.
- **Realtime Visualization** — Watch algorithms explore and solve mazes step-by-step, animated in the browser.

## Tech Stack

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Build tool     | [Vite](https://vitejs.dev/)                         |
| UI framework   | [React 19](https://react.dev/)                      |
| Routing        | [React Router](https://reactrouter.com/) (HashRouter) |
| Styling        | [TailwindCSS v4](https://tailwindcss.com/)          |
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
│   ├── components/                   # Reusable UI components
│   │   ├── Footer.jsx                # 11 lines
│   │   └── Navbar.jsx                # 36 lines
│   ├── pages/                        # Route pages
│   │   ├── About.jsx                 # 48 lines
│   │   └── Home.jsx                  # 53 lines
│   ├── algorithms/                   # Maze generation & pathfinding logic
│   ├── App.jsx                       # Root component with routes
│   ├── index.css                     # TailwindCSS import
│   └── main.jsx                      # Entry point, HashRouter
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
- **Routing**: Uses `HashRouter` to avoid 404 issues on GitHub Pages. All routes are defined in `src/App.jsx`.
- **Styling**: Exclusive use of TailwindCSS utility classes. No custom CSS files outside of `src/index.css`.
- **Linting**: ESLint v9 with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. Run `make lint` before committing.
- **Deployment**: `make deploy` runs a production build, copies `public/CNAME` into `dist/`, and publishes the `gh-pages` branch. The site is served at `maze-solver.thefrenchartist.dev`.

## License

MIT
