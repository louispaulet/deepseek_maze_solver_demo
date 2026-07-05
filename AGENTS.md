# AGENTS.md

## Repository Goal

The goal of this repo is to test the capabilities of **DeepSeek V4 Pro** by making mazes (generating mazes to solve) and comparing pathfinding algorithms to solve the mazes, in a browser, in realtime.

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

## Makefile Commands

| Command        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `make up`      | Run `npm install` then `npm run dev` (start dev server)  |
| `make lint`    | Run `npm run lint` (ESLint across the project)           |
| `make test`    | Run `npm test` (test suite)                              |
| `make build`   | Run `npm run build` (Vite production build → `dist/`)    |
| `make deploy`  | Build, copy `public/CNAME` into `dist/`, publish `gh-pages` branch |

## Project Structure & File Size Limits

```
deepseek_maze_solver_demo/
├── public/
│   ├── CNAME                    # Custom domain: maze-solver.thefrenchartist.dev
│   └── vite.svg                 # Favicon
├── src/
│   ├── components/              # Reusable UI components (max ~70-100 lines each)
│   │   ├── Footer.jsx           # 11 lines — site footer
│   │   └── Navbar.jsx           # 36 lines — sticky top navbar
│   ├── pages/                   # Route-level views (max ~70-100 lines each)
│   │   ├── About.jsx            # 48 lines — about page
│   │   └── Home.jsx             # 53 lines — landing page
│   ├── algorithms/              # Maze generation & pathfinding algorithm logic
│   ├── App.jsx                  # 20 lines — root component with Routes
│   ├── index.css                # 1 line — TailwindCSS import
│   └── main.jsx                 # 13 lines — entry point, HashRouter setup
├── .gitignore
├── AGENTS.md                    # This file
├── eslint.config.js             # ESLint v9 flat config
├── index.html                   # Vite entry HTML
├── Makefile                     # up / lint / test / build / deploy targets
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js               # Vite + React + TailwindCSS plugins, base: '/'
```

## Routing

- **HashRouter** is used instead of BrowserRouter to prevent 404 errors on GitHub Pages.
- Routes are defined in `src/App.jsx`:
  - `/` → `src/pages/Home.jsx`
  - `/about` → `src/pages/About.jsx`
- Add new pages by creating a file in `src/pages/` and adding a `<Route>` in `App.jsx`.

## Component & Page Conventions

- **All files must stay between 70–100 lines.** If a component grows beyond that, extract sub-components or utility functions into separate files.
- **Pages** (`src/pages/`) handle full views tied to a route. They compose UI from components in `src/components/`.
- **Components** (`src/components/`) are reusable, presentational pieces (Navbar, Footer, buttons, cards, etc.).
- **Algorithms** (`src/algorithms/`) contain pure logic — no React, no DOM. Import them into pages or components as needed.

## Styling Conventions

- **TailwindCSS v4** utility classes only. No inline styles, no CSS modules, no separate `.css` files beyond `src/index.css`.
- Dark theme by default (`bg-gray-950`, `text-white`).
- Accent color is `indigo-400`.

## Linting

- **ESLint v9** with flat config (`eslint.config.js`).
- Plugins: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
- Run `make lint` before committing. Linting errors must be fixed before a PR can be merged.

## Deployment

- `make deploy` runs `vite build`, copies `public/CNAME` into `dist/`, and pushes to the `gh-pages` branch.
- The site is served at **http://maze-solver.thefrenchartist.dev**.
- Ensure the CNAME file exists in `public/` and contains `maze-solver.thefrenchartist.dev`.

## Commit & Push Policy

- **Always commit and push after every change**, even when working directly on `main`. Never leave uncommitted or unpushed work behind.
- Commit messages must be clear, in English, and describe what changed and why.
- Use present-tense, imperative mood (e.g., "Add Navbar component", not "Added navbar").
