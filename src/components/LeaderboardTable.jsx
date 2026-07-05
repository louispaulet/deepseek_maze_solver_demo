import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const COLS = [
  { key: 'size', label: 'Size' }, { key: 'genLabel', label: 'Generator' },
  { key: 'pathLabel', label: 'Solver' }, { key: 'steps', label: 'Steps' },
  { key: 'pathLength', label: 'Path Len' }, { key: 'pctVisited', label: '% Visited' },
  { key: 'timeMs', label: 'Time (ms)' },
];

export default function LeaderboardTable({ results, genAlgos, pathAlgos }) {
  const [sortColumn, setSortColumn] = useState('size');
  const [sortDir, setSortDir] = useState('asc');
  const [filterGen, setFilterGen] = useState('all');
  const [filterPath, setFilterPath] = useState('all');
  const [filterSize, setFilterSize] = useState('');

  const handleSort = (col) =>
    setSortColumn((prev) => { setSortDir(prev === col ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc'); return col; });

  const filtered = useMemo(() => {
    let list = results;
    if (filterGen !== 'all') list = list.filter((r) => r.genAlgo === filterGen);
    if (filterPath !== 'all') list = list.filter((r) => r.pathAlgo === filterPath);
    if (filterSize.trim()) list = list.filter((r) => r.size.includes(filterSize.trim()));
    return [...list].sort((a, b) => {
      const va = a[sortColumn], vb = b[sortColumn];
      if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
  }, [results, sortColumn, sortDir, filterGen, filterPath, filterSize]);

  if (!results || results.length === 0) {
    return <p className="text-center text-gray-500 py-12">No results yet. Run a benchmark to see data here.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={filterGen} onChange={(e) => setFilterGen(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300">
          <option value="all">All Generators</option>
          {Object.entries(genAlgos).map(([k, { label }]) => <option key={k} value={k}>{label}</option>)}
        </select>
        <select value={filterPath} onChange={(e) => setFilterPath(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300">
          <option value="all">All Solvers</option>
          {Object.entries(pathAlgos).map(([k, { label }]) => <option key={k} value={k}>{label}</option>)}
        </select>
        <input type="text" placeholder="Filter by size\u2026" value={filterSize}
          onChange={(e) => setFilterSize(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 w-32" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-800">
            <tr>
              {COLS.map(({ key, label }) => (
                <th key={key} onClick={() => handleSort(key)}
                  className="px-4 py-2 text-gray-400 font-medium cursor-pointer hover:text-indigo-400 select-none">
                  {label}{sortColumn === key && <span className="ml-1 text-indigo-400">{sortDir === 'asc' ? '\u25b2' : '\u25bc'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-gray-800/50 even:bg-gray-900/50">
                {COLS.map(({ key }) => (
                  <td key={key} className="px-4 py-2 text-gray-300">{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

LeaderboardTable.propTypes = {
  results: PropTypes.array.isRequired,
  genAlgos: PropTypes.object.isRequired,
  pathAlgos: PropTypes.object.isRequired,
};
