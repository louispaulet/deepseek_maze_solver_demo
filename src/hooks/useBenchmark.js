import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Manages a pool of Web Workers for parallel benchmark execution.
 * @param {number} concurrency - Max parallel workers (default 4)
 * @returns {{ results, isRunning, progress, start, cancel }}
 */
export default function useBenchmark(concurrency = 4) {
  concurrency = Math.min(concurrency, navigator.hardwareConcurrency || 4);
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const workersRef = useRef([]);
  const completedRef = useRef(0);
  const totalRef = useRef(0);
  const cancelledRef = useRef(false);

  const terminateAll = useCallback(() => {
    for (const w of workersRef.current) w.terminate();
    workersRef.current = [];
  }, []);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
    terminateAll();
    setIsRunning(false);
    setProgress(0);
  }, [terminateAll]);

  const start = useCallback((tasks) => {
    if (isRunning) cancel();
    cancelledRef.current = false;

    const totalRuns = tasks.reduce((sum, t) => sum + t.pathAlgos.length, 0);
    completedRef.current = 0;
    totalRef.current = totalRuns;
    setResults([]);
    setProgress(0);
    setIsRunning(true);

    const workerCount = Math.min(concurrency, tasks.length);
    const chunks = Array.from({ length: workerCount }, () => []);
    tasks.forEach((task, i) => chunks[i % workerCount].push(task));

    const workers = [];
    let doneCount = 0;
    const allResults = [];

    for (const chunk of chunks) {
      if (chunk.length === 0) continue;
      const worker = new Worker(
        new URL('../workers/benchmark.worker.js', import.meta.url),
        { type: 'module' }
      );

      worker.onmessage = (e) => {
        if (cancelledRef.current) return;
        if (e.data.type === 'result') {
          allResults.push(e.data.entry);
          completedRef.current++;
          setProgress(completedRef.current / totalRef.current);
          if (completedRef.current % 10 === 0 || completedRef.current === totalRef.current)
            setResults([...allResults]);
        } else if (e.data.type === 'done') {
          doneCount++;
          if (doneCount >= workers.length) finish();
        }
      };

      worker.onerror = () => { doneCount++; if (doneCount >= workers.length) finish(); };
      worker.postMessage({ type: 'run', tasks: chunk });
      workers.push(worker);
    }

    function finish() {
      setResults([...allResults]);
      setIsRunning(false);
      terminateAll();
    }

    workersRef.current = workers;
  }, [concurrency, isRunning, cancel, terminateAll]);

  useEffect(() => {
    return () => { cancelledRef.current = true; terminateAll(); };
  }, [terminateAll]);

  return { results, isRunning, progress, start, cancel };
}
