import { useState, useCallback } from 'react';
import { ALGORITHMS } from '../algorithms/constants';
import { PATHFINDING_ALGORITHMS } from '../algorithms/pathfindingConstants';
import MazeControls from '../components/MazeControls';
import MazeCanvas from '../components/MazeCanvas';
import SolverControls from '../components/SolverControls';

export { ALGORITHMS };

export default function MazeSolver() {
  const [algo, setAlgo] = useState('recursive-backtracking');
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [mazeGrid, setMazeGrid] = useState(null);
  const [showSeed, setShowSeed] = useState(false);
  const [selectedAlgos, setSelectedAlgos] = useState(new Set(['bfs', 'astar']));
  const [results, setResults] = useState(null);

  const handleGenerate = () => {
    const { grid } = ALGORITHMS[algo].fn(rows, cols, seed);
    setMazeGrid(grid);
    setResults(null);
  };

  const handleSolve = useCallback(() => {
    if (!mazeGrid) return;
    const start = { row: 0, col: 0 };
    const goal = { row: mazeGrid.length - 1, col: mazeGrid[0].length - 1 };
    const newResults = {};
    for (const key of selectedAlgos) {
      const { visitedOrder, path } = PATHFINDING_ALGORITHMS[key].fn(mazeGrid, start, goal);
      newResults[key] = { visitedOrder, path, label: PATHFINDING_ALGORITHMS[key].label };
    }
    setResults(newResults);
  }, [mazeGrid, selectedAlgos]);

  const algoKeys = results ? Object.keys(results) : [];
  const gridCols = algoKeys.length <= 2 ? algoKeys.length : 2;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">
        Maze <span className="text-indigo-400">Solver</span>
      </h1>

      <MazeControls
        algo={algo} setAlgo={setAlgo}
        rows={rows} setRows={setRows}
        cols={cols} setCols={setCols}
        seed={seed} setSeed={setSeed}
        showSeed={showSeed} setShowSeed={setShowSeed}
        onGenerate={handleGenerate}
      />

      {mazeGrid && (
        <SolverControls
          selected={selectedAlgos} setSelected={setSelectedAlgos}
          onSolve={handleSolve} hasMaze={!!mazeGrid}
        />
      )}

      {results ? (
        <div
          className="mt-6 grid gap-4"
          style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
        >
          {algoKeys.map((key) => {
            const { visitedOrder, path, label } = results[key];
            return (
              <div key={key} className="flex flex-col items-center">
                <span className="text-sm font-medium text-indigo-400 mb-2">{label}</span>
                <MazeCanvas grid={mazeGrid} cellSize={14} visitedOrder={visitedOrder} path={path} />
                <div className="flex gap-4 mt-1.5 text-xs text-gray-400">
                  <span>Visited: {visitedOrder.length}</span>
                  <span>Path: {path.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        mazeGrid && !results && (
          <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center text-gray-500">
            Select algorithms above and click <span className="text-emerald-400">Solve Maze</span>
          </div>
        )
      )}
    </div>
  );
}
