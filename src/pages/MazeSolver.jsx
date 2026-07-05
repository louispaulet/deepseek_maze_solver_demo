import { useState } from 'react';
import { ALGORITHMS } from '../algorithms/constants';
import MazeControls from '../components/MazeControls';
import MazeCanvas from '../components/MazeCanvas';

export { ALGORITHMS };

export default function MazeSolver() {
  const [algo, setAlgo] = useState('recursive-backtracking');
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [mazeGrid, setMazeGrid] = useState(null);
  const [showSeed, setShowSeed] = useState(false);

  const handleGenerate = () => {
    const { grid } = ALGORITHMS[algo].fn(rows, cols, seed);
    setMazeGrid(grid);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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

      {mazeGrid ? (
        <div className="overflow-auto rounded-xl border border-gray-800 bg-gray-950 p-4">
          <MazeCanvas grid={mazeGrid} cellSize={18} />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-16 text-center text-gray-500">
          Select parameters and click <span className="text-indigo-400">Generate Maze</span>
        </div>
      )}
    </div>
  );
}
