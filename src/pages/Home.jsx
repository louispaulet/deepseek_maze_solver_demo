import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GENERATION_ALGOS, PATHFINDING_ALGOS, FEATURES } from './homeData';
import HeroDecoration from '../assets/illustrations/HeroDecoration';
import { GenerateIcon, PathfindIcon, FeaturesIcon } from '../assets/icons/SectionIcons';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-6">
        <HeroDecoration />
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
            className="rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700
              hover:border-gray-600 px-6 py-3 text-base font-medium text-gray-200 transition-colors">
            View on GitHub →
          </a>
        </div>
      </section>

      {/* Maze Generation */}
      <Section title="Maze" highlight="Generation" icon={<GenerateIcon />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GENERATION_ALGOS.map(({ title, desc }) => (
            <div key={title}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="text-indigo-400 font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pathfinding */}
      <Section title="Pathfinding" highlight="Comparison" icon={<PathfindIcon />}>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Select up to four algorithms and run them side-by-side on the same
          maze. Watch each one explore the grid cell by cell, and compare
          how many cells each visits before finding the path.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATHFINDING_ALGOS.map(({ title, subtitle, desc, badge }) => (
            <div key={title}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-indigo-400 font-bold text-lg">{title}</h3>
                <span className="text-xs rounded-full bg-indigo-500/10 border
                  border-indigo-500/30 text-indigo-300 px-2 py-0.5">{badge}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{subtitle}</p>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section title="Other" highlight="Features" icon={<FeaturesIcon />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ title, desc }) => (
            <div key={title}
              className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer CTA */}
      <section className="text-center border-t border-gray-800 pt-12">
        <p className="text-gray-400 mb-6">
          Want to learn more about how this project was built?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/about"
            className="rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700
              px-6 py-2.5 text-sm font-medium text-gray-200 transition-colors">
            Read the About page →
          </Link>
          <Link to="/maze-solver"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5
              text-sm font-semibold text-white transition-colors">
            Launch the Demo
          </Link>
        </div>
      </section>
    </div>
  );
}

function Section({ title, highlight, children, icon }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
        {icon}
        {title} <span className="text-indigo-400">{highlight}</span>
      </h2>
      {children}
    </section>
  );
}
Section.propTypes = {
  title: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
};
