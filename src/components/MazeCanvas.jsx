import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a maze grid on an HTML Canvas.
 */
export default function MazeCanvas({ grid, cellSize = 20 }) {
  const canvasRef = useRef(null);
  const rows = grid.length;
  const cols = grid[0].length;
  const width = cols * cellSize;
  const height = rows * cellSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // jsdom / headless environments

    // Scale for HiDPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, width, height);

    // Draw each cell
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const { top, right, bottom, left } = grid[r][c].walls;

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();

        if (top)    { ctx.moveTo(x, y); ctx.lineTo(x + cellSize, y); }
        if (right)  { ctx.moveTo(x + cellSize, y); ctx.lineTo(x + cellSize, y + cellSize); }
        if (bottom) { ctx.moveTo(x, y + cellSize); ctx.lineTo(x + cellSize, y + cellSize); }
        if (left)   { ctx.moveTo(x, y); ctx.lineTo(x, y + cellSize); }

        ctx.stroke();
      }
    }

    // Start cell (green)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(1, 1, cellSize - 2, cellSize - 2);

    // End cell (red)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect((cols - 1) * cellSize + 1, (rows - 1) * cellSize + 1, cellSize - 2, cellSize - 2);
  }, [grid, cellSize, rows, cols, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg border border-gray-700 shadow-lg"
      style={{ width, height }}
    />
  );
}

MazeCanvas.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        walls: PropTypes.shape({
          top: PropTypes.bool.isRequired,
          right: PropTypes.bool.isRequired,
          bottom: PropTypes.bool.isRequired,
          left: PropTypes.bool.isRequired,
        }).isRequired,
      })
    )
  ).isRequired,
  cellSize: PropTypes.number,
};
