# I Asked an AI to Build a Maze Solver App. It Nailed It. Then It Forgot to Check If It Actually Worked.

*July 5, 2026 — 7 min read*

---

## The Experiment

Here's the deal. There's a new AI model called **DeepSeek V4 Pro**, and everyone's wondering: *can it actually code?* Not just write cute snippets — but build a real, working, production-ready web application from scratch, following a spec like a real developer would.

So I gave it a challenge.

I wrote a detailed instruction file (`AGENTS.md`) telling it exactly what to build: a **maze solver web app**. You know — the kind where you generate a maze, pick some algorithms, and watch them race each other to find the exit. Realtime animation. Split-screen comparison. Dark theme. Mobile-friendly. 90+ automated tests. Deploy it live with a custom domain. The works.

The rules were strict:
- Use React, TailwindCSS, Vite — no cheating on the tech stack
- Every file must be **70–100 lines max** — no giant spaghetti files
- Commit and push **after every single change**
- No skipping tests

Then I let the AI loose.

---

## What Happened: 3 Hours, 41 Commits, One Complete App

In just **3 hours and 14 minutes**, the AI went from zero to a fully functional, deployed maze solver. Here's what it built step by step:

### Phase 1: The Skeleton (3 minutes)
It set up the entire project — React, TailwindCSS, routing, linting, testing, deployment scripts. It even created a **31-item to-do list** so it wouldn't forget anything. That's more organized than most humans I know.

### Phase 2: Maze Generators (12 minutes)
It implemented **3 different ways to generate mazes**:
- **Recursive Backtracking** — creates long, twisty corridors (think: horror movie maze)
- **Prim's Algorithm** — grows the maze outward from a single cell
- **Kruskal's Algorithm** — randomly connects sections like stitching a quilt

It also wrote **52 tests** to prove the mazes were actually solvable. Smart.

### Phase 3: Pathfinding (2 minutes)
Four pathfinding algorithms in one commit:
- **BFS** — explores level by level, guaranteed shortest path
- **DFS** — goes deep first, fast but not always optimal
- **Dijkstra** — the textbook classic
- **A\*** — the smart one that uses a "heuristic" to guess which direction is best

Plus 17 more tests making sure they all work.

### Phase 4: UI & Animation (24 minutes)
This is where it got fun. The AI built:
- A **split-screen view** where you run up to 4 algorithms side-by-side on the same maze
- **Step-by-step animation** with play/pause/speed controls (like a YouTube video for algorithms!)
- **Loading skeletons** — those pulsing gray boxes that show while stuff loads
- **Toast notifications** — the little popup messages that say "hey, this maze is unsolvable"
- **Responsive layout** — works on phones, tablets, and desktops
- **Dynamic canvas scaling** — the maze auto-resizes to fit your screen

At this point, the AI declared **"MVP complete!"** and checked off all 31 items on its to-do list. 🎉

### Phase 5–8: Polish & Deploy (the rest of the time)
It spent the remaining time making things prettier, adding a **leaderboard page** (with Web Workers for parallel benchmarks!), fixing deployment issues, and ironing out bugs.

The final result? A live, production-quality app at **[maze-solver.thefrenchartist.dev](https://maze-solver.thefrenchartist.dev)** with **90 tests**, CI/CD via GitHub Actions, and a custom domain.

---

## The Plot Twist: It Never Checked Its Own Work

So far, sounds amazing, right? 10/10, give the AI a raise.

But here's the thing. As I reviewed the commit history, a pattern emerged that was both funny and kind of alarming.

**The AI was a brilliant builder but a terrible inspector.**

It would write 200 lines of code, commit it, push it, and call it done — **without ever running the app to see if it worked.** It never ran `make lint`. It didn't re-run `make test` after making changes. It never opened a browser.

Let me show you what I mean.

---

## The Bugs the AI Left Behind (And How I Found Them)

### 🐛 Bug #1: The Invisible Maze

The AI added a cool feature where you can watch the maze being built wall-by-wall. But it set the default to "on" — and forgot to show the maze canvas at all when no algorithms were running.

**What happened when I clicked "Generate Maze"?** Nothing. Blank screen. The maze was there, just invisible.

**How was it caught?** I opened the app and clicked the button. That's it. One click.

**The AI should have caught this by:** Running the app once and clicking "Generate Maze."

---

### 🐛 Bug #2: JavaScript Math Meltdown

The AI added a nice feature where the maze auto-resizes to fit your screen. But the drawing code referenced a variable (`cellSize`) that was `undefined` in auto-size mode. JavaScript did what JavaScript does with `undefined` math: everything became `NaN`. Zero pixels. Invisible maze again.

**What happened?** Blank canvas. No maze at all in auto-sizing mode.

**How was it caught?** Opened the app without passing a fixed size.

**The AI should have caught this by:** Testing the component without the optional prop — basic React stuff.

---

### 🐛 Bug #3: The Checkerboard Problem

The AI colored the cells that an algorithm visits, but there was a 1-pixel gap between each filled cell. Instead of a smooth colored path, it looked like a checkerboard.

**What happened?** Ugly rendering. The path overlay didn't look like a path.

**How was it caught?** Looking at the screen.

**The AI should have caught this by:** Looking at its own output in a browser.

---

### 🐛 Bug #4: Lint Errors Sitting in Plain Sight

The AI had set up ESLint itself in Phase 1. The `Makefile` had `make lint` ready to go. But at the end of the project, there were still **two ESLint errors**: an unused import and a React anti-pattern.

**The AI should have caught this by:** Running the `make lint` command *that it created itself.*

---

### 🐛 Bug #5: Tests It Broke and Never Noticed

The AI changed a default value from `true` to `false` in one of its bugfixes. Seems innocent, right? But it broke the test suite — the test helper was now toggling the checkbox in the wrong direction.

90 tests... some now failing... and the AI never noticed because **it never ran `make test` after the change.**

---

### 🐛 Bug #6: The Deployment That Sort-Of Worked

The AI deployed the app to GitHub Pages. Good! But it forgot to include a tiny file called `.nojekyll` (it tells GitHub "don't try to process this as a Jekyll site"). Result: broken routing.

**The AI should have caught this by:** Checking the live site after deploying.

---

## The Pattern

Here's the thing that makes this so interesting: **every single bug could have been caught by running 3 commands the AI itself had set up:**

```bash
make lint    # catches unused imports and React mistakes
make test    # catches broken tests
make up      # starts the dev server so you can... look at it
```

That's it. Three commands. The AI built the tools to verify its own work, and then simply *forgot to use them.*

---

## So How Good Is It, Really?

Let's be fair. This is still incredibly impressive. Think about what it did in 3 hours:

| What it did | Rating |
|-------------|--------|
| Follow instructions exactly | ⭐⭐⭐⭐⭐ |
| Write clean, well-structured code | ⭐⭐⭐⭐⭐ |
| Make smart architectural decisions | ⭐⭐⭐⭐⭐ |
| Write comprehensive tests | ⭐⭐⭐⭐☆ |
| Check if its own code actually works | ⭐⭐☆☆☆ |

The AI is like a **genius intern** who can build anything you ask for, at lightning speed, exactly to spec — but who never tests their code before handing it in. You *must* review their work.

---

## What This Means

If you're thinking about using AI coding agents in your workflow, here's my advice:

**✅ DO use it for:**
- Scaffolding projects and boilerplate
- Implementing well-defined features
- Writing tests (it's surprisingly good at this)
- Generating documentation
- Rapid prototyping

**❌ DON'T trust it to:**
- Verify its own output
- Catch its own bugs
- Know when it broke something
- Work autonomously without human review

The winning formula seems to be: **AI builds, human verifies.** The AI handles the tedious, time-consuming work. The human handles quality assurance. Together, you move incredibly fast.

It's not quite ready to replace a developer. But it's an amazing *pair programmer* — one that types at warp speed and never complains about writing tests.

---

## Try It Yourself

The app is live at **[maze-solver.thefrenchartist.dev](https://maze-solver.thefrenchartist.dev)** — go play with it!

The full code is on [GitHub](https://github.com/louispaulet/deepseek_maze_solver_demo).

And if you want the nitty-gritty details — every commit, every bug, every fix — check out the **[full benchmark report](./benchmark_report.md)**.

---

*This post is part of an experiment to evaluate DeepSeek V4 Pro as a coding agent. The AI built the app. I broke it, found the bugs, and wrote this up. The conclusion? Great builder, needs a human co-pilot.*
