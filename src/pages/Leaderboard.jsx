import { useState, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import { ALGORITHMS } from '../algorithms/constants';
import { PATHFINDING_ALGORITHMS } from '../algorithms/pathfindingConstants';
import useBenchmark from '../hooks/useBenchmark';
import { useToast } from '../components/ToastProvider';
import BenchmarkControls from '../components/BenchmarkControls';
import LeaderboardTable from '../components/LeaderboardTable';

const SIZES = [5, 10, 15, 20, 25, 30, 40, 50];
const genKeys = Object.keys(ALGORITHMS);
const pathKeys = Object.keys(PATHFINDING_ALGORITHMS);

export default function Leaderboard() {
  const [genSelected, setGenSelected] = useState(new Set(genKeys));
  const [pathSelected, setPathSelected] = useState(new Set(pathKeys));
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const toast = useToast();
  const { results, isRunning, progress, start, cancel } = useBenchmark(4);

  const tasks = useMemo(() => {
    const selectedPaths = [...pathSelected];
    const result = [];
    for (const genAlgo of genSelected) {
      for (const size of SIZES) {
        result.push({ genAlgo, rows: size, cols: size, seed: seed + size * 100, pathAlgos: selectedPaths });
      }
    }
    return result;
  }, [genSelected, pathSelected, seed]);

  const totalRuns = tasks.reduce((sum, t) => sum + t.pathAlgos.length, 0);
  const completed = Math.round(progress * totalRuns);

  const handleRun = () => {
    const pathCount = [...pathSelected].length;
    toast(`Running ${tasks.length} mazes \u00d7 ${pathCount} algorithms\u2026`, 'info');
    start(tasks);
  };

  const handleCancel = () => {
    cancel();
    toast('Benchmark cancelled.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 flex items-center gap-3">
        <BarChart3 size={28} className="text-indigo-400" />
        Benchmark <span className="text-indigo-400 ml-1">Leaderboard</span>
      </h1>

      <BenchmarkControls
        genSelected={genSelected}
        setGenSelected={setGenSelected}
        pathSelected={pathSelected}
        setPathSelected={setPathSelected}
        seed={seed}
        setSeed={setSeed}
        isRunning={isRunning}
        progress={progress}
        totalRuns={totalRuns}
        completed={completed}
        onRun={handleRun}
        onCancel={handleCancel}
      />

      <LeaderboardTable
        results={results}
        genAlgos={ALGORITHMS}
        pathAlgos={PATHFINDING_ALGORITHMS}
      />
    </div>
  );
}
