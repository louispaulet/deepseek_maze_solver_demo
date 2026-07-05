import PropTypes from 'prop-types';

/**
 * Animation playback controls: play/pause, step forward, reset, speed slider.
 */
export default function AnimationControls({
  isPlaying, step, maxStep, speed, onPlay, onPause, onStep, onReset, onSpeedChange,
}) {
  const pct = maxStep > 0 ? Math.round((step / maxStep) * 100) : 0;

  return (
    <div className="mt-6 border-t border-gray-800 pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>

        <button
          onClick={onStep}
          disabled={step >= maxStep}
          className="rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 px-3 py-2 text-sm text-gray-200 transition-colors"
          title="Step forward"
        >
          ⏭ Step
        </button>

        <button
          onClick={onReset}
          disabled={step === 0}
          className="rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 px-3 py-2 text-sm text-gray-200 transition-colors"
          title="Reset"
        >
          ↺ Reset
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-gray-500 w-10 text-right">{pct}%</span>
          <input
            type="range"
            min={0}
            max={maxStep}
            value={step}
            onChange={(e) => onStep(Number(e.target.value))}
            className="w-32 accent-indigo-500"
            title="Scrub timeline"
          />
        </div>

        <label className="flex items-center gap-1.5 text-xs text-gray-400">
          Speed
          <input
            type="range"
            min={1}
            max={200}
            value={210 - speed}
            onChange={(e) => onSpeedChange(210 - Number(e.target.value))}
            className="w-20 accent-indigo-500"
          />
          <span className="w-8 text-gray-500">{speed}ms</span>
        </label>
      </div>
    </div>
  );
}

AnimationControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  maxStep: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onStep: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
};
