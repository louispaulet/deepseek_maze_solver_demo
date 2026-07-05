import PropTypes from 'prop-types';
import { Play, Square, RefreshCw } from 'lucide-react';
import { ALGORITHMS } from '../algorithms/constants';
import { PATHFINDING_ALGORITHMS } from '../algorithms/pathfindingConstants';

const chipClass = (active) =>
  `flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer text-xs transition-colors ${
    active
      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
      : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600'
  }`;

function toggleSet(setFn, key) {
  setFn((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
}

function CheckboxGroup({ registry, selected, onChange, disabled }) {
  return Object.entries(registry).map(([key, { label }]) => (
    <label key={key} className={chipClass(selected.has(key))}>
      <input type="checkbox" checked={selected.has(key)}
        onChange={() => onChange(key)} className="accent-indigo-500" disabled={disabled} />
      {label}
    </label>
  ));
}

export default function BenchmarkControls({
  genSelected, setGenSelected, pathSelected, setPathSelected,
  seed, setSeed, isRunning, progress, totalRuns, completed, onRun, onCancel,
}) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">Maze Generators</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <CheckboxGroup registry={ALGORITHMS} selected={genSelected}
          onChange={(k) => toggleSet(setGenSelected, k)} disabled={isRunning} />
      </div>

      <h3 className="text-sm font-semibold text-gray-300 mb-3">Pathfinding</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <CheckboxGroup registry={PATHFINDING_ALGORITHMS} selected={pathSelected}
          onChange={(k) => toggleSet(setPathSelected, k)} disabled={isRunning} />
      </div>

      <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
        <span>Seed: <code className="text-indigo-400 bg-gray-800 px-2 py-0.5 rounded">{seed}</code></span>
        <button onClick={() => setSeed(Math.floor(Math.random() * 100000))}
          disabled={isRunning} className="text-indigo-400 hover:text-indigo-300 disabled:text-gray-600"
          title="Regenerate seed"><RefreshCw size={14} /></button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        {isRunning ? (
          <button onClick={onCancel}
            className="rounded-lg bg-red-600 hover:bg-red-500 px-6 py-2 text-sm font-semibold text-white transition-colors flex items-center gap-2">
            <Square size={14} /> Cancel</button>
        ) : (
          <button onClick={onRun} disabled={genSelected.size === 0 || pathSelected.size === 0}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 px-6 py-2 text-sm font-semibold text-white transition-colors flex items-center gap-2">
            <Play size={14} /> Run Benchmark</button>
        )}
        <span className="text-xs text-gray-500">
          {isRunning
            ? `Completed ${completed} of ${totalRuns} — ${Math.round(progress * 100)}%`
            : `${totalRuns} total runs`}
        </span>
      </div>

      {isRunning && (
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div className="bg-indigo-500 h-2 rounded-full transition-all duration-200"
            style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
    </div>
  );
}

BenchmarkControls.propTypes = {
  genSelected: PropTypes.object.isRequired,
  setGenSelected: PropTypes.func.isRequired,
  pathSelected: PropTypes.object.isRequired,
  setPathSelected: PropTypes.func.isRequired,
  seed: PropTypes.number.isRequired,
  setSeed: PropTypes.func.isRequired,
  isRunning: PropTypes.bool,
  progress: PropTypes.number,
  totalRuns: PropTypes.number,
  completed: PropTypes.number,
  onRun: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
