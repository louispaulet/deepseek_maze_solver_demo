import { useState, useCallback } from 'react';
import { ALGORITHMS } from '../algorithms/constants';
import { PATHFINDING_ALGORITHMS } from '../algorithms/pathfindingConstants';
import useAnimation from '../hooks/useAnimation';
import MazeControls from '../components/MazeControls';
import SolverControls from '../components/SolverControls';
import AnimationControls from '../components/AnimationControls';
import ResultsPanel from '../components/ResultsPanel';

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
  const [generating, setGenerating] = useState(false);
  const [solving, setSolving] = useState(false);

  const maxStep = results
    ? Math.max(...Object.values(results).map((r) => r.visitedOrder.length))
    : 0;
  const anim = useAnimation(maxStep);

  const handleGenerate = () => {
    setGenerating(true);
    setResults(null);
    setMazeGrid(null);
    setTimeout(() => {
      setMazeGrid(ALGORITHMS[algo].fn(rows, cols, seed).grid);
      setGenerating(false);
      anim.reset();
    }, 0);
  };

  const handleSolve = useCallback(() => {
    if (!mazeGrid) return;
    setSolving(true);
    setResults(null);
    setTimeout(() => {
      const start = { row: 0, col: 0 };
      const goal = { row: mazeGrid.length - 1, col: mazeGrid[0].length - 1 };
      const newResults = {};
      for (const key of selectedAlgos) {
        const { visitedOrder, path } = PATHFINDING_ALGORITHMS[key].fn(mazeGrid, start, goal);
        newResults[key] = { visitedOrder, path, label: PATHFINDING_ALGORITHMS[key].label };
      }
      setResults(newResults);
      setSolving(false);
      anim.reset();
    }, 0);
  }, [mazeGrid, selectedAlgos]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedKeys = [...selectedAlgos];
  const selectedLabels = selectedKeys.map((k) => PATHFINDING_ALGORITHMS[k].label);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
        Maze <span className="text-indigo-400">Solver</span>
      </h1>

      <MazeControls
        algo={algo} setAlgo={setAlgo} rows={rows} setRows={setRows}
        cols={cols} setCols={setCols} seed={seed} setSeed={setSeed}
        showSeed={showSeed} setShowSeed={setShowSeed}
        onGenerate={handleGenerate} generating={generating}
      />

      {mazeGrid && (
        <SolverControls
          selected={selectedAlgos} setSelected={setSelectedAlgos}
          onSolve={handleSolve} hasMaze={!!mazeGrid} solving={solving}
        />
      )}

      {results && (
        <AnimationControls
          isPlaying={anim.isPlaying} step={anim.step} maxStep={maxStep}
          speed={anim.speed} onPlay={anim.play} onPause={anim.pause}
          onStep={anim.setStep} onReset={anim.reset} onSpeedChange={anim.setSpeed}
        />
      )}

      <ResultsPanel
        generating={generating} solving={solving}
        results={results} mazeGrid={mazeGrid}
        rows={rows} cols={cols}
        selectedKeys={selectedKeys} selectedLabels={selectedLabels}
        anim={anim}
      />
    </div>
  );
}
