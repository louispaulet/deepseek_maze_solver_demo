const GEN = [
  {
    name: 'Recursive Backtracking',
    desc: 'DFS-based generator that carves long, winding corridors with relatively few branches. Produces mazes with a distinct main-path feel.',
  },
  {
    name: "Prim's Algorithm",
    desc: 'Randomized Prim\'s that grows the maze from a single cell, adding frontier walls at random. Balanced mix of short dead-ends and branches.',
  },
  {
    name: "Kruskal's Algorithm",
    desc: 'Union-Find based. Randomly joins separate regions until all cells connect. Produces highly branching, dense mazes with many dead-ends.',
  },
];

const PATH = [
  {
    name: 'BFS (Breadth-First Search)',
    desc: 'Explores level by level. Guaranteed to find the shortest path on an unweighted grid.',
  },
  {
    name: 'DFS (Depth-First Search)',
    desc: 'Follows one branch as deep as possible before backtracking. Fast but does not guarantee the optimal path.',
  },
  {
    name: "Dijkstra's Algorithm",
    desc: 'General shortest-path with uniform edge weights. Serves as a baseline for comparison against heuristically-guided algorithms.',
  },
  {
    name: 'A* (A-Star)',
    desc: 'Combines Dijkstra\'s cost-so-far with a Manhattan-distance heuristic. Most efficient — typically visits far fewer cells than BFS or Dijkstra.',
  },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
        About This <span className="text-indigo-400">Project</span>
      </h1>

      <section className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          The <strong className="text-white">DeepSeek Maze Solver Demo</strong> is an
          experiment to test the capabilities of <strong className="text-white">DeepSeek V4
          Pro</strong> — a large language model — by building a non-trivial, interactive web
          application entirely with its assistance.
        </p>
        <p>
          Maze generation and pathfinding are classic computer science problems. Building
          the full application — project scaffolding, algorithm logic, UI, animations, tests,
          and deployment — is a practical benchmark for reasoning, planning, and code generation.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10">Maze Generation</h2>
        {GEN.map(({ name, desc }) => (
          <div key={name} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <h3 className="text-indigo-400 font-semibold">{name}</h3>
            <p className="text-sm text-gray-400 mt-1">{desc}</p>
          </div>
        ))}

        <h2 className="text-xl font-semibold text-white mt-10">Pathfinding</h2>
        {PATH.map(({ name, desc }) => (
          <div key={name} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <h3 className="text-indigo-400 font-semibold">{name}</h3>
            <p className="text-sm text-gray-400 mt-1">{desc}</p>
          </div>
        ))}

        <h2 className="text-xl font-semibold text-white mt-10">Features</h2>
        <ul className="list-disc list-inside space-y-2 ml-2 text-gray-400">
          {[
            'Seeded randomness — deterministic mazes via Mulberry32 PRNG. Share a seed to reproduce the same maze.',
            'Step-by-step animation — watch generation and pathfinding unfold one wall or one cell at a time.',
            'Side-by-side comparison — run up to four algorithms simultaneously and compare visited cells and path length.',
            'DPR-aware Canvas rendering — sharp on Retina/HiDPI displays via devicePixelRatio scaling.',
            'Responsive design — fluid layout from mobile to wide desktop, with auto-scaling canvas.',
            'Toast notifications — contextual alerts (e.g. unsolvable maze) without intrusive dialogs.',
            '90 tests — unit tests for every algorithm and component, run with Vitest.',
          ].map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-white mt-10">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {['Vite', 'React 19', 'TailwindCSS v4', 'React Router', 'Canvas API',
            'Vitest', 'ESLint v9', 'GitHub Pages', 'gh-pages'].map((t) => (
            <span key={t}
              className="rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-300 text-center">
              {t}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-white mt-10">License</h2>
        <p>MIT — do whatever you want with it.</p>
      </section>
    </div>
  );
}
