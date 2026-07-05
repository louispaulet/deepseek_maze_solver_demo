# Benchmark Report: DeepSeek V4 Pro — Maze Solver Demo

## Introduction

This report documents the results of an experiment to test the coding capabilities of **DeepSeek V4 Pro** by building a complete, production-quality maze solver web application from scratch. The task was given via an `AGENTS.md` file (included in the repository) that specified:

- A **tech stack** (Vite, React 19, TailwindCSS v4, React Router, ESLint v9, Vitest)
- **Routing conventions** (HashRouter for GitHub Pages)
- **File size limits** (70–100 lines per file)
- **Styling conventions** (Tailwind-only, dark theme, indigo accent)
- **Testing requirements** (Vitest + Testing Library, 100% coverage goal)
- **Deployment requirements** (GitHub Pages with custom domain)
- A **commit & push policy** (commit and push after every single change)

The entire application was built on **July 5, 2026** in a single session spanning approximately **3 hours and 14 minutes** (19:31 to 22:45 CEST), producing **41 commits** on the `main` branch across 8 distinct development phases.

The final deliverable includes:

- **3 maze generation algorithms** (Recursive Backtracking, Prim's, Kruskal's with Union-Find)
- **4 pathfinding algorithms** (BFS, DFS, Dijkstra, A* with Manhattan heuristic)
- **Realtime step-by-step animation** for both generation and solving, with play/pause/speed controls
- **Split-screen comparison view** running up to 4 algorithms side-by-side on the same maze
- **Leaderboard page** with parallel benchmarking via Web Workers
- **HiDPI-aware Canvas rendering** with dynamic auto-scaling via ResizeObserver
- **90 unit tests** across 16 test files covering all algorithms and UI components
- **Responsive layout** for desktop, tablet, and mobile
- **CI/CD pipeline** with GitHub Actions + automated gh-pages deployment
- **Custom domain** at [maze-solver.thefrenchartist.dev](https://maze-solver.thefrenchartist.dev)

---

## Development Timeline

All times are in CEST (UTC+2) on July 5, 2026. Total elapsed time: **3 hours, 14 minutes**.

### Phase 1: Project Scaffolding (19:31–19:34, ~3 min)

| Commit | Time | Description |
|--------|------|-------------|
| `d85c1f3` | 19:31 | Initial scaffold: Vite + React 19 + TailwindCSS v4. Created 16 files including `App.jsx`, `Navbar.jsx`, `Footer.jsx`, `Home.jsx`, `About.jsx`, `vite.config.js`, `Makefile`, and full `package.json`. |
| `2972e1c` | 19:31 | Switched from BrowserRouter to HashRouter for GitHub Pages compatibility. Added `public/CNAME` pointing to `maze-solver.thefrenchartist.dev`. Updated deploy script to copy CNAME into `dist/`. |
| `ad8a287` | 19:32 | Added ESLint v9 with flat config, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`. Added `make lint` target. |
| `2b3d477` | 19:34 | Overhauled `README.md` and `AGENTS.md` with full project documentation: tech stack tables, complete project structure, conventions, commit policy, and all Makefile targets. |
| `6d0431f` | 19:34 | Created `TODO.md` with a 31-item MVP roadmap covering maze generation, Canvas rendering, pathfinding, split-screen comparison, animation, testing, responsive layout, CI/CD, and deployment. |

**Status at end of Phase 1:** Empty React shell with navigation, placeholder pages, linting, and a detailed roadmap. Zero algorithm code yet.

### Phase 2: Maze Generation Algorithms (19:36–19:48, ~12 min)

| Commit | Time | Description |
|--------|------|-------------|
| `e678bca` | 19:36 | Implemented Recursive Backtracking (DFS-based) maze generator. Created `src/algorithms/mazeGenerator.js` (131 lines) with `createGrid()`, `getUnvisitedNeighbours()`, `shuffle()`, `mulberry32` seeded PRNG, and `recursiveBacktracking()`. Returns both the carved grid and step-by-step wall removals for animation. |
| `4ef8fed` | 19:37 | Added Prim's algorithm (`prim()`) to the same file, reusing existing grid/neighbour/PRNG helpers. File now ~200 lines. |
| `5892b7a` | 19:39 | **Split `mazeGenerator.js` (200 lines)** into 4 files to respect the 70–100 line limit: `mazeUtils.js` (helpers), `recursiveBacktracking.js`, `prim.js`, and `mazeGenerator.js` (barrel re-export). Created `constants.js` for the algorithm registry. |
| `3edd9ae` | 19:45 | Added full unit test coverage: 44 tests across 8 files (`createGrid`, `getUnvisitedNeighbours`, `mulberry32`, `shuffle`, `recursiveBacktracking`, `prim`, `MazeCanvas`, `MazeSolver`). Configured Vitest with jsdom. Extracted `MazeControls` and `MazeCanvas` components from `MazeSolver.jsx`. |
| `63bec12` | 19:46 | Fixed jsdom Canvas warnings by mocking `HTMLCanvasElement.prototype.getContext` in `test-setup.js` (returns a full 2D context stub with all common methods). |
| `7985cf2` | 19:48 | Implemented Kruskal's algorithm with Union-Find (path compression + union by rank). Added 8 tests (reachability, determinism, seed behavior, cross-algorithm difference). Registered in `constants.js`. |

**Status at end of Phase 2:** All 3 maze generation algorithms implemented and tested (52 tests). File size limits respected.

### Phase 3: Pathfinding Algorithms (19:50, ~2 min)

| Commit | Time | Description |
|--------|------|-------------|
| `b4184ce` | 19:50 | Implemented all 4 pathfinding algorithms in a single commit: BFS (`bfs.js`, 68 lines), DFS (`dfs.js`, 42 lines, iterative), Dijkstra (`dijkstra.js`, 62 lines, priority queue), A* (`astar.js`, 68 lines, Manhattan heuristic). Created `pathfindingConstants.js` registry. Added 17 tests across 4 files validating path correctness, optimality (BFS/Dijkstra/A* equal path length), and heuristic pruning (A* visits ≤ BFS). |

**Status at end of Phase 3:** All 7 algorithms done. 69 tests passing. TODO.md now 47% complete.

### Phase 4: UI, Visualization & UX (19:55–20:19, ~24 min)

| Commit | Time | Description |
|--------|------|-------------|
| `1725235` | 19:55 | Added split-screen comparison solver view. Enhanced `MazeCanvas` with `visitedOrder` and `path` overlay rendering. Created `SolverControls.jsx` with algorithm checkboxes (up to 4). Wired up in `MazeSolver.jsx` with responsive grid layout and per-algorithm stats (visited count, path length). |
| `acfa43c` | 19:58 | Added step-based animation loop. Created `useAnimation.js` hook (step state, setInterval playback, auto-pause, speed control). Created `AnimationControls.jsx` with play/pause/step/reset buttons, timeline scrubber, and speed slider (1–200ms). Integrated into comparison view. |
| `f82ba67` | 19:59 | Added CI workflow via GitHub Actions (`.github/workflows/ci.yml`): Node.js 20.x/22.x matrix, `npm ci` → lint → test → build. |
| `a307cfd` | 20:01 | Added dynamic canvas auto-scaling with `ResizeObserver`. `MazeCanvas` now fills its container width when no `cellSize` prop is provided, computes optimal cell size (capped 4–40px), and falls back to 20px. |
| `13baf0a` | 20:04 | Aligned canvas colors with dark theme: background `#030712` (gray-950), walls/stroke `#818cf8` (indigo-400), border `gray-800`. |
| `b0f3cff` | 20:05 | Added responsive layout for tablet and mobile: adaptive grid columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), larger touch targets (44px minimum), wider range sliders, reworked `AnimationControls` layout into two rows. |
| `c356f82` | 20:10 | Added loading skeletons with `LoadingSkeleton.jsx` (pulsing placeholder matching maze aspect ratio). Extracted `ResultsPanel.jsx` to keep `MazeSolver` under 100 lines. Added `generating`/`solving` disabled states to control buttons. Used `setTimeout(0)` to let React render skeleton before heavy JS work. |
| `0441d45` | 20:12 | Added toast notification system (`ToastProvider.jsx` with context/hook, 80 lines). Three toast types (error/success/info) with 4-second auto-dismiss and slide-in animation. Integrated into `App.jsx` and used in `MazeSolver` to warn on unsolvable mazes. |
| `df6eb80` | 20:13 | Added component smoke tests for all control components: `MazeControls.test.jsx`, `SolverControls.test.jsx`, `AnimationControls.test.jsx`. Test suite grew from 71 to 90 tests. |
| `b775e8c` | 20:19 | **🎉 MVP complete!** Added animated maze generation step-by-step with toggle. Created `useGenerationAnimation.js` hook (40 lines), `applySteps()` utility in `mazeUtils.js`, "Animate generation" checkbox in `MazeControls`. All TODO.md items marked complete. |

**Status at end of Phase 4:** Full MVP delivered. 90 tests passing, all files ≤100 lines, responsive UI, loading states, error handling, CI/CD.

### Phase 5: Visual Polish & Bugfixes (20:20–21:02, ~42 min)

| Commit | Time | Description |
|--------|------|-------------|
| `5e98678` | 20:20 | Added live demo link to `README.md`. |
| `1d71654` | 20:23 | **Bugfix:** Generation animation defaulted to `true`, causing the maze canvas to be invisible after generation. Also, `ResultsPanel` only showed a text prompt instead of the maze canvas. Fixed by changing default to `false` and rendering `MazeCanvas` when a maze exists. |
| `0c87a53` | 20:24 | **Bugfix:** `MazeCanvas` drawing code referenced the `cellSize` prop directly, which was `undefined` when the prop was omitted (auto-sizing mode via ResizeObserver). This produced NaN coordinates and an invisible maze. Fixed by using the computed `dynamicSize` variable throughout. |
| `cdfb940` | 20:58 | Changed visited cell color from semi-transparent indigo to yellow (`#facc15`) and solved path color from yellow to red (`#ef4444`) for better visibility. |
| `7c2c2ab` | 21:00 | Removed the 1px gap padding from fill rectangles (visited cells, path, start, goal) so fills cover entire cells with no gaps. Walls are drawn on top of fills with `lineWidth: 2`. |
| `64150f4` | 21:01 | Darkened the solved path red to improve contrast against the red goal cell. |

### Phase 6: Pages Redesign & SVG Assets (21:06–21:44, ~38 min)

| Commit | Time | Description |
|--------|------|-------------|
| `2e306bd` | 21:06 | Redesigned `Home.jsx` and `About.jsx` with full algorithm inventory cards (3 generators + 4 pathfinders), feature grid, hero section with CTA buttons, tech stack badges. Extracted card data to `homeData.js`. Updated `README.md` with algorithm tables. |
| `9890b31` | 21:35 | Added custom SVG assets: `MazeIcon.jsx` for navbar/About, `SectionIcons.jsx` for Home sections, `HeroDecoration.jsx` for hero illustration. |
| `aad08a8` | 21:40 | Replaced custom SVGs with `lucide-react` icons for professional quality. Extracted shared components: `Section.jsx`, `InfoCard.jsx`, `HeroSection.jsx`, `AlgoCardList.jsx`. Added dot-pattern background to hero via CSS utility. |
| `926f8c1` | 21:44 | Merged PR #1 (`feat/svg-assets` → `main`). |

### Phase 7: Leaderboard (22:08, ~1 min)

| Commit | Time | Description |
|--------|------|-------------|
| `a4cc477` | 22:08 | Added Leaderboard page with parallel benchmarking via Web Workers. Created `benchmark.worker.js` (Web Worker), `useBenchmark.js` hook (worker pool, concurrency, progress, cancellation), `BenchmarkControls.jsx`, `LeaderboardTable.jsx` (sortable/filterable results), and `Leaderboard.jsx` page. Added `/leaderboard` route and navbar link. |

### Phase 8: Deployment Fixes & Final Cleanup (22:40–22:45, ~5 min)

| Commit | Time | Description |
|--------|------|-------------|
| `54430ab` | 22:40 | Added `public/.nojekyll` to prevent Jekyll processing on GitHub Pages (which would otherwise break the SPA). |
| `4636df9` | 22:41 | **Bugfix:** The `gh-pages` deployment was not including dotfiles (`.nojekyll`). Fixed by adding the `--dotfiles` flag to the `gh-pages` command in the Makefile. |
| `26250d0` | 22:44 | **Bugfix:** Fixed two ESLint violations — unused import of `createGrid` in `useGenerationAnimation.js` and a `setState`-inside-`useEffect` anti-pattern in `MazeCanvas.jsx`. |
| `100d6b0` | 22:45 | **Bugfix:** Fixed pre-existing test failure. After changing `animateGen` default from `true` to `false`, the test helper `generateWithoutAnimation` was clicking the "Animate generation" checkbox — which now toggled it ON instead of ensuring it was OFF. Removed the unnecessary click. |

---

## Bugs and Hurdles

Below is a catalog of every issue discovered during development, how it manifested, its root cause, and how it was resolved. Issues are ordered chronologically by when they were discovered and fixed.

### 1. File Size Limit Violation (`mazeGenerator.js`)

**Type:** Conventions / Architecture
**Discovered:** After implementing Prim's algorithm (commit `4ef8fed`)
**Manifestation:** `mazeGenerator.js` grew to ~200 lines, violating the project's 70–100 line limit per file.
**Root cause:** The agent implemented two maze generators plus all shared utilities (grid creation, neighbour traversal, shuffle, PRNG) in a single monolithic file.
**Resolution (commit `5892b7a`):** Split into 4 files:
- `mazeUtils.js` (71 lines) — `createGrid`, `getUnvisitedNeighbours`, `shuffle`, `mulberry32`, `applySteps`
- `recursiveBacktracking.js` (58 lines) — Recursive Backtracking generator
- `prim.js` (70 lines) — Prim's algorithm generator
- `mazeGenerator.js` (7 lines) — barrel re-export

**Self-detected?** Yes — the agent noticed the file exceeded the limit stated in `AGENTS.md` and proactively refactored before any tests were written.

### 2. jsdom Canvas 2D Context Warnings in Tests

**Type:** Test Infrastructure
**Discovered:** After adding the first Canvas-rendering test (commit `3edd9ae`)
**Manifestation:** Console warnings in test output: `getContext('2d')` returned `null` from jsdom.
**Root cause:** jsdom does not implement the Canvas API.
**Resolution (commit `63bec12`):** Added a comprehensive mock of `HTMLCanvasElement.prototype.getContext` in `src/test-setup.js` that returns a stub 2D context with all commonly-used methods (`fillRect`, `beginPath`, `moveTo`, `lineTo`, `stroke`, `fillStyle`, `lineWidth`, `scale`, etc.).

**Self-detected?** Yes — the agent noticed the warnings from the test runner and proactively fixed them.

### 3. Generation Animation Default & Missing Maze Canvas

**Type:** Logic Error / UI Bug
**Discovered:** After implementing animated maze generation (commit `b775e8c`)
**Manifestation:** 
1. When the page loaded and the user clicked "Generate Maze", the maze appeared to do nothing — no canvas was shown at all.
2. Even when a maze was generated, the UI only showed a text prompt saying "Select algorithms above and click Solve Maze" instead of showing the maze canvas.
**Root cause:** Two issues compounded:
1. The `animateGen` state in `useGenerationAnimation.js` defaulted to `true`, but the user had to toggle animation on manually to see anything.
2. `ResultsPanel.jsx` only rendered the `MazeCanvas` when results existed (after solving), not when just the maze was generated. It showed a static text prompt in a bordered box instead.
**Resolution (commit `1d71654`):**
1. Changed `animateGen` default from `true` to `false` so generation is instant by default.
2. Modified `ResultsPanel.jsx` to render `MazeCanvas` when `mazeGrid` exists (even before solving), with the prompt text below it.

**Self-detected?** No — this was discovered during manual testing by the user, not by the agent.

### 4. MazeCanvas Drawing with Undefined `cellSize`

**Type:** Rendering Bug
**Discovered:** After adding dynamic canvas auto-scaling (commit `a307cfd`)
**Manifestation:** When no `cellSize` prop was passed to `MazeCanvas` (the auto-scaling code path), the maze rendered as a blank canvas — no walls, no cells, nothing visible.
**Root cause:** The drawing code inside the `useEffect` used `cellSize` prop directly for coordinate calculations (`col * cellSize`, `row * cellSize`). When `cellSize` was `undefined` (auto-sizing mode), all coordinates became `NaN`, producing no visible output. The `dynamicSize` variable was computed correctly but not used in the drawing logic.
**Resolution (commit `0c87a53`):** Created a local `const size = dynamicSize;` and replaced all 14 occurrences of `cellSize` with `size` in the drawing code.

**Self-detected?** No — discovered during manual testing by the user.

### 5. Canvas Color Visibility & Dark Theme Alignment

**Type:** Visual Polish
**Discovered:** During UI review after the main features were complete
**Manifestation:** With the initial color scheme:
- Visited cells used `rgba(129, 140, 248, 0.25)` (semi-transparent indigo) — too subtle
- The solved path used yellow (`#facc15`) — confusing for a "solution"
- The canvas background (`#111827`, gray-900) didn't match the page body (`#030712`, gray-950), creating a visible seam
- Walls used indigo-500 instead of the project's accent color (indigo-400)
**Resolution (3 commits):**
1. `13baf0a` — Aligned background to gray-950, walls to indigo-400, border to gray-800.
2. `cdfb940` — Changed visited cells to solid yellow (`#facc15`) and solved path to red (`#ef4444`).
3. `64150f4` — Darkened the path red for better contrast against the goal cell (also red).

**Self-detected?** Partially — the dark theme alignment commit (`13baf0a`) was proactive. The color changes for visited/path cells (`cdfb940`, `64150f4`) appear to be user-initiated.

### 6. Cell Gap in Filled Rectangles

**Type:** Visual Rendering Bug
**Discovered:** After changing colors (commit `cdfb940`)
**Manifestation:** Visited cells and the solved path had 1px gaps between adjacent filled cells, making the overlay look like a checkerboard instead of solid blocks. Only cell walls were visible between fill areas.
**Root cause:** The fill rectangles used 1px padding: `fillRect(col * size + 1, row * size + 1, size - 2, size - 2)`. This left a 1px gap all around each cell.
**Resolution (commit `7c2c2ab`):** Changed all fill rectangles to use full cell dimensions: `fillRect(col * size, row * size, size, size)`. Walls are now drawn on top of fills with `lineWidth: 2`, making only the maze walls visible.

**Self-detected?** No — discovered during visual review by the user.

### 7. gh-pages Deployment Missing Dotfiles

**Type:** Deployment Infrastructure
**Discovered:** After adding `.nojekyll` and deploying
**Manifestation:** The `.nojekyll` file was not present in the deployed `gh-pages` branch, causing GitHub Pages to attempt Jekyll processing on the SPA, breaking the routing.
**Root cause:** The `gh-pages` npm package does not include dotfiles by default.
**Resolution (commit `4636df9`):** Added the `--dotfiles` flag to the `npx gh-pages -d dist` command in the Makefile: `npx gh-pages -d dist --dotfiles`.

**Self-detected?** Partially — the agent added `.nojekyll` proactively (`54430ab`), but did not realize the deployment command was dropping it. The fix (`4636df9`) was user-initiated.

### 8. ESLint Violations

**Type:** Code Quality
**Discovered:** During final linting check (commit `26250d0`)
**Manifestation:** Two ESLint errors:
1. `'createGrid' is defined but never used` in `useGenerationAnimation.js`
2. Calling `setState` inside a `useEffect` without proper dependency handling in `MazeCanvas.jsx`
**Root cause:**
1. After refactoring the generation flow, `createGrid` was imported but no longer called directly.
2. The `useEffect` for canvas resizing called `setDynamicSize(computeSize())` inside an observer callback, which triggered the React hooks lint rule.
**Resolution (commit `26250d0`):**
1. Removed the unused `createGrid` import.
2. Restructured `MazeCanvas.jsx` to compute `size` outside the drawing effect, eliminating the need for state updates inside the effect.

**Self-detected?** No — the ESLint errors were present in the codebase but the agent did not catch them before committing. They were only fixed when explicitly prompted.

### 9. Test Helper Toggling Wrong Direction After Default Change

**Type:** Test Regression
**Discovered:** After changing `animateGen` default from `true` to `false` (commit `1d71654`)
**Manifestation:** Tests that relied on `generateWithoutAnimation` helper started failing. The test suite that previously passed was now broken.
**Root cause:** The test helper `generateWithoutAnimation` was clicking the "Animate generation" checkbox to disable animation. After the default changed from `true` to `false`, clicking the checkbox now *enabled* animation instead of disabling it, producing the wrong test behavior.
**Resolution (commit `100d6b0`):** Removed the now-unnecessary `fireEvent.click` on the checkbox — since the default is already `false`, no toggle is needed.

**Self-detected?** No — this was only discovered when the tests were explicitly run. The agent did not notice the test breakage at the time of the default change.

---

## Overall Assessment

### What DeepSeek V4 Pro Did Well

The model demonstrated exceptional capabilities in several areas:

1. **Prompt adherence (⭐⭐⭐⭐⭐).** The agent followed the `AGENTS.md` specification with remarkable fidelity. Every convention — file size limits, Tailwind-only styling, HashRouter, component/page separation, dark theme with indigo accent, Vitest testing, Makefile targets — was followed precisely. The model never deviated from the requested tech stack or conventions, even across 41 commits.

2. **Architecture decisions.** The agent made sound architectural choices unprompted:
   - **Seeded PRNG** (`mulberry32`) for deterministic maze generation — essential for reproducibility
   - **Step-by-step wall removal** recording in generators for later animation — forward-thinking design
   - **Barrel re-exports** (`mazeGenerator.js`) for clean public API
   - **Registry pattern** (`constants.js`, `pathfindingConstants.js`) for algorithm discoverability
   - **Custom hooks** (`useAnimation.js`, `useGenerationAnimation.js`, `useBenchmark.js`) for clean separation of concerns
   - **Web Workers** for non-blocking benchmark computation

3. **Code quality.** The generated code is clean, well-structured, and properly documented with JSDoc. Every function has clear responsibilities. Error boundaries, loading states, and edge cases are handled throughout.

4. **Testing rigor.** The agent wrote 90 tests across 16 files, covering:
   - Pure algorithm logic (correctness, determinism, edge cases)
   - Canvas rendering (dimensions, props)
   - Component rendering (smoke tests, prop variations, disabled states)
   - User interaction flows (generate → solve → animate)
   - Configuring proper test infrastructure (Vitest, jsdom, Canvas mocking)

5. **Iterative development.** The agent followed a clear progression: scaffold → maze generation → pathfinding → UI → polish → deploy. Each phase built cleanly on the previous one.

6. **Scope management.** The `TODO.md` roadmap was created early and systematically checked off. All 31 MVP items were completed.

### Where DeepSeek V4 Pro Fell Short

Despite the strong overall performance, the model showed a consistent and significant weakness:

**Poor self-troubleshooting and error detection.** The agent repeatedly committed code with bugs that should have been caught by basic self-verification:

| Issue | Should have been caught by | How it was actually discovered |
|-------|---------------------------|-------------------------------|
| Maze canvas invisible after generation (`animateGen` default + missing canvas) | Running the app once and clicking "Generate Maze" | **User manual testing** |
| `undefined` `cellSize` → `NaN` coordinates → blank canvas | Looking at the Canvas component, or rendering a maze without the `cellSize` prop | **User manual testing** |
| Cell gaps in filled rectangles | Visual inspection of the rendered output | **User manual testing** |
| gh-pages missing `.nojekyll` | Checking the deployed site after the first deploy | **User manual testing** |
| ESLint violations | Running `make lint` before committing (which was available since Phase 1) | **Explicitly pointed out, fixed last** |
| Test regression after default change | Running `make test` after changing `animateGen` default | **Explicitly discovered when tests were finally run** |

The core pattern is clear: **the agent rarely verified its own output.** It generated code, committed it, and reported the task as complete without running the app, checking the UI, running lint, or re-running tests after changes that could cause regressions. Bugs that would have been obvious from a single manual smoke test were left for the user to find.

This is particularly notable because:
- The `Makefile` with `make lint`, `make test`, and `make up` targets was available from the very first phase
- The agent itself had created the linting and testing infrastructure
- A simple `npm run dev` + browser preview would have caught 5 of the 6 issues above

### Verdict

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Prompt adherence | ⭐⭐⭐⭐⭐ | Flawless. Every constraint respected. |
| Code quality | ⭐⭐⭐⭐⭐ | Clean, well-structured, idiomatic React. |
| Architecture | ⭐⭐⭐⭐⭐ | Forward-thinking, extensible design. |
| Testing | ⭐⭐⭐⭐☆ | Comprehensive but with a regression bug introduced late. |
| Self-troubleshooting | ⭐⭐☆☆☆ | Major weakness. Bugs go undetected without external feedback. |
| Autonomy | ⭐⭐⭐☆☆ | Can build complex apps independently but cannot verify its own work. |

---

## Conclusion

This experiment demonstrated that **DeepSeek V4 Pro is a remarkably capable coding agent** when given a well-defined specification. In just over 3 hours, it produced a complete, production-quality maze solver — 3 generators, 4 pathfinding algorithms, realtime animation, responsive UI, 90 tests, CI/CD, and live deployment — all while strictly adhering to every convention in the project brief.

The model's **prompt adherence is outstanding.** At no point did it deviate from the tech stack, file size limits, styling conventions, or architectural patterns specified in `AGENTS.md`. It made intelligent, forward-thinking design choices (seeded PRNG, step recording for animation, Web Workers for benchmarks) that went beyond the explicit requirements.

However, the experiment also revealed a **critical blind spot: self-verification.** The agent rarely checked its own output. It did not run `make lint` before committing (despite having built the linting infrastructure itself), did not re-run `make test` after changes that introduced regressions, and did not visually verify the UI in a browser. As a result, 6 distinct bugs — all trivially caught by a single manual smoke test — were left for the user to discover.

**The pattern is consistent:** the agent is an exceptional *builder* but a poor *inspector.* It can generate high-quality code rapidly, but it cannot reliably determine whether that code actually works without external feedback.

For production use, this means **DeepSeek V4 Pro works best with a human-in-the-loop** who validates the output after each feature is delivered. Alternatively, the model could be paired with explicit verification instructions (e.g., "after every change, run `make lint && make test` and check the browser") to partially compensate for this weakness.

**Final takeaway:** DeepSeek V4 Pro is a powerful tool for accelerating development, but it is not yet ready for fully autonomous coding workflows. The human must remain the final gatekeeper for quality assurance.

---

*Report generated on July 5, 2026, based on analysis of 41 commits on the `main` branch.*
