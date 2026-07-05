import PropTypes from 'prop-types';
import MazeCanvas from './MazeCanvas';
import LoadingSkeleton from './LoadingSkeleton';

/**
 * Renders the maze comparison grid, loading skeletons, or empty-state prompt.
 */
export default function ResultsPanel({
  generating, solving, results, mazeGrid, rows, cols,
  selectedKeys, selectedLabels, anim,
}) {
  if (generating) {
    return <LoadingSkeleton rows={rows} cols={cols} count={1} />;
  }

  if (solving) {
    return (
      <LoadingSkeleton
        rows={rows} cols={cols}
        count={selectedKeys.length}
        labels={selectedLabels}
      />
    );
  }

  if (results) {
    const algoKeys = Object.keys(results);
    return (
      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {algoKeys.map((key) => {
          const { visitedOrder, path, label } = results[key];
          const visible = visitedOrder.slice(0, Math.min(anim.step, visitedOrder.length));
          return (
            <div key={key} className="flex flex-col items-center">
              <span className="text-sm font-medium text-indigo-400 mb-2">{label}</span>
              <MazeCanvas grid={mazeGrid}
                visitedOrder={visible} path={anim.isComplete ? path : []} />
              <div className="flex gap-4 mt-1.5 text-xs text-gray-400">
                <span>Visited: {visible.length}/{visitedOrder.length}</span>
                <span>Path: {anim.isComplete ? path.length : '—'}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (mazeGrid) {
    return (
      <div className="mt-6 flex flex-col items-center gap-4">
        <MazeCanvas grid={mazeGrid} />
        <p className="text-sm text-gray-500">
          Select algorithms above and click <span className="text-emerald-400">Solve Maze</span>
        </p>
      </div>
    );
  }

  return null;
}

ResultsPanel.propTypes = {
  generating: PropTypes.bool,
  solving: PropTypes.bool,
  results: PropTypes.object,
  mazeGrid: PropTypes.array,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  anim: PropTypes.shape({
    step: PropTypes.number,
    isComplete: PropTypes.bool,
  }).isRequired,
};
