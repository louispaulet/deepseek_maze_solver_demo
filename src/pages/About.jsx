export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
        About This <span className="text-indigo-400">Project</span>
      </h1>

      <section className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          The <strong className="text-white">DeepSeek Maze Solver Demo</strong> is an experiment to test the
          capabilities of <strong className="text-white">DeepSeek V4 Pro</strong> — a large language model —
          by building a non-trivial, interactive web application.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Why Mazes?</h2>
        <p>
          Maze generation and pathfinding are classic computer science problems that combine:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2 text-gray-400">
          <li>Graph theory and tree structures</li>
          <li>Algorithm design (DFS, BFS, Dijkstra, A*)</li>
          <li>Real-time visualization and animation</li>
          <li>UI/UX design for an interactive demo</li>
        </ul>
        <p>
          Building this entire application — from project scaffolding to algorithm implementation
          to deployment — is a practical benchmark for DeepSeek V4 Pro&#39;s reasoning, planning,
          and code-generation abilities.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {['Vite', 'React', 'TailwindCSS', 'React Router', 'Canvas API', 'GitHub Pages'].map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-300 text-center"
            >
              {tech}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">License</h2>
        <p>MIT — do whatever you want with it.</p>
      </section>
    </div>
  );
}
