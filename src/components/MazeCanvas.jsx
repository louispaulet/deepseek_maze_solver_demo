import { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const MAX_CELL_SIZE = 40;
const MIN_CELL_SIZE = 4;
const FALLBACK_CELL_SIZE = 20;

// Dark-theme canvas colours matching the Tailwind palette:
//   bg-gray-950 (#030712), indigo-400 (#818cf8), yellow-400 (#facc15),
//   green-500 (#22c55e), red-500 (#ef4444)
const BG_COLOR = '#030712';
const WALL_COLOR = '#818cf8';
const VISITED_COLOR = '#facc15';
const PATH_COLOR = '#991b1b';
const START_COLOR = '#22c55e';
const GOAL_COLOR = '#ef4444';

/**
 * Renders a maze grid on an HTML Canvas, with optional pathfinding overlay.
 * When `cellSize` is omitted, the canvas auto-scales to fill its container width.
 */
export default function MazeCanvas({ grid, cellSize, visitedOrder, path }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dynamicSize, setDynamicSize] = useState(FALLBACK_CELL_SIZE);
  const rows = grid.length;
  const cols = grid[0].length;

  const computeSize = useCallback(() => {
    if (!containerRef.current) return FALLBACK_CELL_SIZE;
    const containerWidth = containerRef.current.clientWidth;
    if (containerWidth === 0) return FALLBACK_CELL_SIZE;
    const raw = Math.floor(containerWidth / cols);
    return Math.min(Math.max(raw, MIN_CELL_SIZE), MAX_CELL_SIZE);
  }, [cols]);

  // Track container width with ResizeObserver (fallback to static size if unavailable)
  // Only track container resizes in auto-scaling mode (cellSize === undefined)
  useEffect(() => {
    if (cellSize !== undefined) return;

    const container = containerRef.current;
    if (!container) return;

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => setDynamicSize(computeSize()));
    observer.observe(container);
    return () => observer.disconnect();
  }, [computeSize, cellSize]);

  const size = cellSize !== undefined ? cellSize : dynamicSize;
  const width = cols * size;
  const height = rows * size;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, width, height);

    // Visited cells overlay (full cell, no gap)
    if (visitedOrder && visitedOrder.length > 0) {
      ctx.fillStyle = VISITED_COLOR;
      for (const { row, col } of visitedOrder) {
        ctx.fillRect(col * size, row * size, size, size);
      }
    }

    // Path overlay (full cell, no gap)
    if (path && path.length > 0) {
      ctx.fillStyle = PATH_COLOR;
      for (const { row, col } of path) {
        ctx.fillRect(col * size, row * size, size, size);
      }
    }

    // Draw walls on top of fills
    ctx.strokeStyle = WALL_COLOR;
    ctx.lineWidth = 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * size;
        const y = r * size;
        const { top, right, bottom, left } = grid[r][c].walls;
        ctx.beginPath();
        if (top)    { ctx.moveTo(x, y); ctx.lineTo(x + size, y); }
        if (right)  { ctx.moveTo(x + size, y); ctx.lineTo(x + size, y + size); }
        if (bottom) { ctx.moveTo(x, y + size); ctx.lineTo(x + size, y + size); }
        if (left)   { ctx.moveTo(x, y); ctx.lineTo(x, y + size); }
        ctx.stroke();
      }
    }

    // Start cell (green) — drawn after walls to stay visible
    ctx.fillStyle = START_COLOR;
    ctx.fillRect(0, 0, size, size);

    // Goal cell (red) — drawn after walls to stay visible
    ctx.fillStyle = GOAL_COLOR;
    ctx.fillRect((cols - 1) * size, (rows - 1) * size, size, size);
  }, [grid, size, rows, cols, width, height, visitedOrder, path]);

  // When a fixed cellSize is given, render the canvas directly to stay backward-compatible
  if (cellSize !== undefined) {
    return (
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-gray-800 shadow-lg"
        style={{ width, height }}
      />
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-gray-800 shadow-lg"
        style={{ width, height }}
      />
    </div>
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
  visitedOrder: PropTypes.arrayOf(PropTypes.shape({ row: PropTypes.number, col: PropTypes.number })),
  path: PropTypes.arrayOf(PropTypes.shape({ row: PropTypes.number, col: PropTypes.number })),
};
