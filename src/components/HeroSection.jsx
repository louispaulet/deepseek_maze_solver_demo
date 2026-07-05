import { Link } from 'react-router-dom';
import { Grid3x3, Route, Sparkles, ExternalLink, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="text-center space-y-6 relative">
      <div className="absolute inset-0 bg-dot-pattern rounded-3xl -z-10" />
      <div className="flex justify-center gap-3 mb-2 opacity-30" aria-hidden="true">
        <Grid3x3 size={32} className="text-indigo-400" />
        <Route size={32} className="text-indigo-400" />
        <Sparkles size={32} className="text-indigo-400" />
        <Zap size={32} className="text-indigo-400" />
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
        DeepSeek <span className="text-indigo-400">Maze Solver</span>
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Generate mazes and compare pathfinding algorithms in realtime — built
        to benchmark the reasoning and code-generation abilities of{' '}
        <strong className="text-white">DeepSeek V4 Pro</strong>.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Link to="/maze-solver"
          className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-8 py-3 text-base
            font-semibold text-white transition-colors shadow-lg shadow-indigo-600/20">
          🧩 Try the Maze Solver
        </Link>
        <a href="https://github.com/louispaulet/deepseek_maze_solver_demo"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-gray-700 bg-gray-800
            hover:bg-gray-700 hover:border-gray-600 px-6 py-3 text-base font-medium
            text-gray-200 transition-colors">
          <ExternalLink size={16} className="mr-1.5" />
          View on GitHub
        </a>
      </div>
    </section>
  );
}
