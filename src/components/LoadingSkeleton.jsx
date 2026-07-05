import PropTypes from 'prop-types';

/**
 * Pulsing placeholder shown while a maze is being generated or solved.
 * Maintains the correct aspect ratio so the layout doesn't jump.
 */
export default function LoadingSkeleton({ rows = 15, cols = 15, count = 1, labels }) {
  return (
    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          {labels && labels[i] && (
            <span className="text-sm font-medium text-indigo-400 mb-2">{labels[i]}</span>
          )}
          <div
            className="w-full animate-pulse rounded-lg border border-gray-800 bg-gray-900/50"
            style={{ aspectRatio: `${cols}/${rows}` }}
          />
          <div className="flex gap-4 mt-1.5">
            <span className="h-3 w-16 animate-pulse rounded bg-gray-800" />
            <span className="h-3 w-10 animate-pulse rounded bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

LoadingSkeleton.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
  count: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
};
