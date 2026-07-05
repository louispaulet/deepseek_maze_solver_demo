export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          DeepSeek <span className="text-indigo-400">Maze Solver</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Generating mazes and comparing pathfinding algorithms in realtime — built to test the capabilities of DeepSeek V4 Pro.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ title, desc }) => (
          <div
            key={title}
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-indigo-500/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Maze Generation',
    desc: 'Procedurally generate mazes with algorithms like Recursive Backtracking, Prim\'s, and Kruskal\'s. Adjust size and complexity in realtime.',
  },
  {
    title: 'Pathfinding Comparison',
    desc: 'Run BFS, DFS, Dijkstra, A*, and more side-by-side. Watch each algorithm explore the maze step-by-step.',
  },
  {
    title: 'Realtime Visualization',
    desc: 'Every step is animated in the browser. See which algorithm finds the optimal path fastest.',
  },
  {
    title: 'DeepSeek V4 Pro',
    desc: 'The entire codebase is generated with the assistance of DeepSeek V4 Pro — a real-world stress test of its reasoning and coding ability.',
  },
  {
    title: 'Configurable Parameters',
    desc: 'Tweak maze size, animation speed, wall density, and algorithm heuristics on the fly.',
  },
  {
    title: 'Open Source',
    desc: 'Fully open-source under the MIT license. Fork it, study it, build on top of it.',
  },
];
