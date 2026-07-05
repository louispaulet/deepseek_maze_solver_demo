import PropTypes from 'prop-types';
import { PATHFINDING_ALGORITHMS } from '../algorithms/pathfindingConstants';

export default function SolverControls({ selected, setSelected, onSolve, hasMaze }) {
  const toggle = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else if (next.size < 4) next.add(key);
      return next;
    });
  };

  return (
    <div className="mt-6 border-t border-gray-800 pt-6">
      <h2 className="text-lg font-semibold mb-3">
        <span className="text-indigo-400">Solve</span> with Pathfinding
      </h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(PATHFINDING_ALGORITHMS).map(([key, { label }]) => (
          <label
            key={key}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer text-sm transition-colors ${
              selected.has(key)
                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.has(key)}
              onChange={() => toggle(key)}
              className="accent-indigo-500"
            />
            {label}
          </label>
        ))}
      </div>

      <button
        onClick={onSolve}
        disabled={!hasMaze || selected.size === 0}
        className="rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors"
      >
        Solve Maze
      </button>
    </div>
  );
}

SolverControls.propTypes = {
  selected: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  onSolve: PropTypes.func.isRequired,
  hasMaze: PropTypes.bool.isRequired,
};
