import PropTypes from 'prop-types';
import { ALGORITHMS } from '../algorithms/constants';

export default function MazeControls({ algo, setAlgo, rows, setRows, cols, setCols, seed, setSeed, showSeed, setShowSeed, onGenerate }) {
  const cycleSeed = (delta) => setSeed((s) => s + delta);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">Algorithm</span>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-indigo-500 outline-none"
        >
          {Object.entries(ALGORITHMS).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">Rows</span>
        <input
          type="number" min={3} max={50} value={rows}
          onChange={(e) => setRows(Math.max(3, parseInt(e.target.value, 10) || 3))}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-indigo-500 outline-none"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">Columns</span>
        <input
          type="number" min={3} max={50} value={cols}
          onChange={(e) => setCols(Math.max(3, parseInt(e.target.value, 10) || 3))}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-indigo-500 outline-none"
        />
      </label>

      <SeedControl seed={seed} setSeed={setSeed} showSeed={showSeed} setShowSeed={setShowSeed} cycleSeed={cycleSeed} />

      <div className="lg:col-span-4">
        <button
          onClick={onGenerate}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors"
        >
          Generate Maze
        </button>
      </div>
    </div>
  );
}

MazeControls.propTypes = {
  algo: PropTypes.string.isRequired,
  setAlgo: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
  setRows: PropTypes.func.isRequired,
  cols: PropTypes.number.isRequired,
  setCols: PropTypes.func.isRequired,
  seed: PropTypes.number.isRequired,
  setSeed: PropTypes.func.isRequired,
  showSeed: PropTypes.bool.isRequired,
  setShowSeed: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
};

function SeedControl({ seed, setSeed, showSeed, setShowSeed, cycleSeed }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-400">
        Seed{' '}
        <button onClick={() => setShowSeed((v) => !v)} className="text-indigo-400 hover:underline ml-1">
          {showSeed ? 'hide' : 'show'}
        </button>
      </span>
      {showSeed ? (
        <div className="flex items-center gap-1">
          <button onClick={() => cycleSeed(-1)} className="text-gray-400 hover:text-white px-1">−</button>
          <input
            type="number" value={seed}
            onChange={(e) => setSeed(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-indigo-500 outline-none"
          />
          <button onClick={() => cycleSeed(1)} className="text-gray-400 hover:text-white px-1">+</button>
        </div>
      ) : (
        <span className="text-sm text-gray-500 py-2">{seed}</span>
      )}
    </div>
  );
}

SeedControl.propTypes = {
  seed: PropTypes.number.isRequired,
  setSeed: PropTypes.func.isRequired,
  showSeed: PropTypes.bool.isRequired,
  setShowSeed: PropTypes.func.isRequired,
  cycleSeed: PropTypes.func.isRequired,
};
