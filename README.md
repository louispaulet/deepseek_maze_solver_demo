# DeepSeek Maze Solver Demo

The goal of this repo is to test the capabilities of **DeepSeek V4 Pro** by generating mazes and comparing pathfinding algorithms to solve them — all rendered in the browser, in realtime.

## Overview

- **Maze Generation**: Procedurally generated mazes using algorithms like Recursive Backtracking, Prim's, and Kruskal's.
- **Pathfinding Comparison**: Side-by-side comparison of BFS, DFS, Dijkstra, A\*, and other pathfinding algorithms.
- **Realtime Visualization**: Watch algorithms explore and solve mazes step-by-step in the browser.

## Tech Stack

- [Vite](https://vitejs.dev/) — fast build tooling
- [React](https://react.dev/) — UI library
- [TailwindCSS](https://tailwindcss.com/) — utility-first CSS

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
make up

# Run tests
make test

# Build for production
make build

# Deploy to GitHub Pages
make deploy
```

## Project Structure

```
├── src/
│   ├── components/    # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/         # Route pages (Home, About)
│   ├── algorithms/    # Maze generation & pathfinding algorithms
│   ├── App.jsx
│   └── main.jsx
├── public/
├── Makefile
└── README.md
```
