# AGENTS.md

## Repository Goal

The goal of this repo is to test the capabilities of **DeepSeek V4 Pro** by making mazes (generating mazes to solve) and comparing pathfinding algorithms to solve the mazes, in a browser, in realtime.

## Tech Stack

- **Build tool**: Vite
- **UI framework**: React
- **Styling**: TailwindCSS
- **Deployment**: GitHub Pages (via `gh-pages`)

## Makefile Commands

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `make up`      | Install deps and start the Vite dev server |
| `make test`    | Run the test suite                       |
| `make build`   | Build the production bundle              |
| `make deploy`  | Deploy the built site to GitHub Pages    |

## Conventions

- Use functional React components with hooks.
- Style exclusively with TailwindCSS utility classes.
- Keep maze generation and pathfinding logic in `src/algorithms/`.
- Pages go in `src/pages/`, reusable components in `src/components/`.
- All new features should land behind a route or be accessible from the homepage.
- Commit messages should be clear and in English.
